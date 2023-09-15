package com.reactapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle; 
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsNativeHelper;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);

  // Initialize Firebase Dynamic Links and handle deep links
    FirebaseDynamicLinks.getInstance().getDynamicLink(getIntent())
        .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
          @Override
          public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
            // Handle the dynamic link here
            Uri deepLink = null;
            if (pendingDynamicLinkData != null) {
              deepLink = pendingDynamicLinkData.getLink();
            }
            // Handle the deep link (e.g., open specific content)
            handleDeepLink(deepLink);
          }
        })
        .addOnFailureListener(this, new OnFailureListener() {
          @Override
          public void onFailure(@NonNull Exception e) {
            Log.w(TAG, "getDynamicLink:onFailure", e);
          }
        });
  }

  // Implement your deep link handling logic here
  private void handleDeepLink(Uri deepLink) {
    if (deepLink != null) {
      // Parse and process the deep link URL here
      String deepLinkString = deepLink.toString();

      // Depending on the deep link structure, you can perform specific actions
      if (deepLinkString.contains("nandhini.page.link/login")) {
        // Open a specific activity or fragment
        openSomePageActivity();
      } else if (deepLinkString.contains("nandhini.page.link/signup")) {
        // Open another activity or fragment
        openAnotherPageActivity();
      } else {
        // Handle other cases or show a default page
        openDefaultActivity();
      }
    }
  }

  // Implement your activity-opening logic here
  private void openSomePageActivity() {
    // Open the activity for "example.com/somepage"
    // You can start a new activity or fragment here
  }

  private void openAnotherPageActivity() {
    // Open the activity for "example.com/anotherpage"
    // You can start a new activity or fragment here
  }

  private void openDefaultActivity() {
    // Handle other cases or show a default page
  }
}