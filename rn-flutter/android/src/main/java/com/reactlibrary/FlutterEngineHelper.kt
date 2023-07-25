package com.reactlibrary

import android.content.Context
import android.content.Intent
import androidx.fragment.app.FragmentActivity
import io.flutter.embedding.android.FlutterFragment
import io.flutter.embedding.engine.FlutterEngineGroup
import io.flutter.embedding.engine.FlutterEngineGroupCache

class FlutterEngineHelper {
    companion object {
        const val ENGINE_GROUP_ID = "my_engine_id"

        @JvmStatic
        fun initEngineGroup(context: Context) {
            // Instantiate a FlutterEngine.
            val flutterEngineGroup = FlutterEngineGroup(context)
            // Cache the FlutterEngineGroup to be used by FlutterFragment.
            FlutterEngineGroupCache
                .getInstance()
                .put(ENGINE_GROUP_ID, flutterEngineGroup)
        }

        @JvmStatic
        fun handleTrimMemory(activity: FragmentActivity, level: Int) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onTrimMemory(level)
            }
        }

        @JvmStatic
        fun handlePostResume(activity: FragmentActivity) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onPostResume()
            }
        }

        @JvmStatic
        fun handleUserLeaveHint(activity: FragmentActivity) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onUserLeaveHint()
            }
        }

        @JvmStatic
        fun handleNewIntent(activity: FragmentActivity, intent: Intent) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onNewIntent(intent)
            }
        }

        @JvmStatic
        fun handleBackPressed(activity: FragmentActivity) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onBackPressed()
            }
        }

        @JvmStatic
        fun handleRequestPermissionsResult(
            activity: FragmentActivity,
            requestCode: Int,
            permissions: Array<String?>,
            grantResults: IntArray
        ) {
            val flutterFragments: List<FlutterFragment> =
                activity.supportFragmentManager.fragments.filterIsInstance<FlutterFragment>()
            for (fragment in flutterFragments) {
                fragment.onRequestPermissionsResult(
                    requestCode,
                    permissions,
                    grantResults
                )
            }
        }
    }
}
