package com.reactapp;

import android.os.Bundle; // Import the Bundle class
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsNativeHelper;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactApp";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
   // Example of handling non-fatal exceptions
  private void handleNonFatalException(Exception e) {
      // Log the exception to Crashlytics
      ReactNativeFirebaseCrashlyticsNativeHelper.recordNativeException(e);
    }
  // @Override
  //   protected void onCreate(Bundle savedInstanceState) {
  //     super.onCreate(savedInstanceState);

  //     // Initialize Firebase Crashlytics (if needed)
  //     ReactNativeFirebaseCrashlyticsNativeHelper.crashlyticsInit();

  //     try {
  //       // Your existing code
  //     } catch (Exception e) {
  //       // Handle the exception and log to Crashlytics
  //       handleNonFatalException(e);
  //     }
  //   }
}
