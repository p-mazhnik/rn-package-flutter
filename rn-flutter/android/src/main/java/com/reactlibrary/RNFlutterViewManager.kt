package com.reactlibrary

import android.util.Log
import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

private data class FlutterViewState(
    var fragment: RNFlutterFragment? = null,
    var initialClicks: Int? = null,
    var initialText: String? = null,
    var initialScreen: String? = null,
)

class RNFlutterViewManager(
    private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>() {
    private val fragmentMap = mutableMapOf<Int, FlutterViewState>()

    override fun getName() = REACT_CLASS

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    override fun createViewInstance(reactContext: ThemedReactContext) =
        FrameLayout(reactContext).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
        }

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    override fun receiveCommand(
        root: FrameLayout,
        commandId: String,
        args: ReadableArray?
    ) {
        super.receiveCommand(root, commandId, args)

        when (commandId) {
            COMMAND_CREATE -> createFragment(root)
        }
    }

    @ReactProp(name = "clicks")
    fun setClicks(view: ViewGroup, value: Int) {
        when (val viewState = fragmentMap[view.id]) {
            null -> fragmentMap[view.id] = FlutterViewState(
                initialClicks = value,
            )
            else -> {
                if (viewState.initialClicks == null) {
                    viewState.initialClicks = value
                }
                if (viewState.fragment != null) {
                    viewState.fragment!!.flutterCounterApi?.setClicks(value.toLong()){}
                }
            }
        }
    }

    @ReactProp(name = "text")
    fun setText(view: ViewGroup, value: String) {
        when (val viewState = fragmentMap[view.id]) {
            null -> fragmentMap[view.id] = FlutterViewState(
                initialText = value,
            )
            else -> {
                if (viewState.initialText == null) {
                    viewState.initialText = value
                }
                if (viewState.fragment != null) {
                    viewState.fragment!!.flutterCounterApi?.setText(value){}
                }
            }
        }
    }

    @ReactProp(name = "screen")
    fun setScreen(view: ViewGroup, value: String) {
        when (val viewState = fragmentMap[view.id]) {
            null -> fragmentMap[view.id] = FlutterViewState(
                initialScreen = value,
            )
            else -> {
                if (viewState.initialScreen == null) {
                    viewState.initialScreen = value
                }
                if (viewState.fragment != null) {
                    viewState.fragment!!.flutterCounterApi?.setScreen(value){}
                }
            }
        }
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    private fun createFragment(root: FrameLayout) {
        Log.d("com.reactlibrary", "createFragment")
        val reactNativeViewId = root.id

        val viewState = fragmentMap[reactNativeViewId]
        val parentView = root.findViewById<ViewGroup>(reactNativeViewId)

        setupLayout(parentView)

        val myFragment = RNFlutterFragment(
            reactNativeViewId,
            reactContext,
            viewState?.initialClicks?.toLong(),
            viewState?.initialText,
            viewState?.initialScreen,
        )
        when (val state = fragmentMap[reactNativeViewId]) {
            null -> fragmentMap[reactNativeViewId] = FlutterViewState(
                fragment = myFragment,
            )
            else -> state.fragment = myFragment
        }
        val activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
            .beginTransaction()
            .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
            .commit()
    }

    override fun onDropViewInstance(view: FrameLayout) {
        super.onDropViewInstance(view)

        val viewState = fragmentMap[view.id] ?: return

        Log.d("com.reactlibrary", "destroyFragment")

        try {
            viewState.fragment
                ?.parentFragmentManager
                ?.beginTransaction()
                ?.remove(viewState.fragment!!)
                ?.commit()
        } catch (e: IllegalStateException) {
            Log.i("com.reactlibrary", "Parent fragment manager not available")
        }

        fragmentMap.remove(view.id)
    }

    private fun setupLayout(view: ViewGroup) {
        Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    /**
     * Layout all children properly
     */
    private fun manuallyLayoutChildren(view: ViewGroup) {
        for (i in 0 until view.childCount) {
            val child = view.getChildAt(i)

            child.measure(
                View.MeasureSpec.makeMeasureSpec(view.measuredWidth, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(view.measuredHeight, View.MeasureSpec.EXACTLY)
            )

            child.layout(0, 0, child.measuredWidth, child.measuredHeight)
        }
//        view.measure(
//            View.MeasureSpec.makeMeasureSpec(view.measuredWidth, View.MeasureSpec.EXACTLY),
//            View.MeasureSpec.makeMeasureSpec(view.measuredHeight, View.MeasureSpec.EXACTLY),
//        )
//        view.layout(view.left, view.top, view.right, view.bottom)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Map<String, String>> {
        return MapBuilder.of(
            COMMAND_TEXT,
            MapBuilder.of("registrationName", "onTextChange"),
            COMMAND_SCREEN,
            MapBuilder.of("registrationName", "onScreenChange"),
            COMMAND_CLICKS,
            MapBuilder.of("registrationName", "onClicksChange")
        )
    }

    companion object {
        private const val REACT_CLASS = "RNFlutterView"
        private const val COMMAND_CREATE = "create"
        const val COMMAND_TEXT = "setText"
        const val COMMAND_SCREEN = "setScreen"
        const val COMMAND_CLICKS = "setClicks"
    }
}
