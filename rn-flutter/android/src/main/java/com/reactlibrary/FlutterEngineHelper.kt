package com.reactlibrary

import android.content.Context
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
    }
}
