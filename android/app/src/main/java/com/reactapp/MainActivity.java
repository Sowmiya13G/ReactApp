package com.reactapp;

import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsNativeHelper;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import org.devio.rn.splashscreen.SplashScreen;


import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity implements PermissionAwareActivity {

    private PermissionListener permissionListener;

    @Override
    protected String getMainComponentName() {
        return "ReactApp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);

                // Initialize Firebase Dynamic Links and handle deep links
                FirebaseDynamicLinks.getInstance().getDynamicLink(getIntent())
                    .addOnSuccessListener(MainActivity.this, pendingDynamicLinkData -> {
                        // Handle the dynamic link here
                        Uri deepLink = null;
                        if (pendingDynamicLinkData != null) {
                            deepLink = pendingDynamicLinkData.getLink();
                        }
                        // Handle the deep link (e.g., open specific content)
                        handleDeepLink(deepLink);
                    })
                    .addOnFailureListener(MainActivity.this, e -> {
                        // Handle failure here
                    });
            }

            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                if (getReactInstanceManager() != null) {
                    getReactInstanceManager().onActivityResult(MainActivity.this, requestCode, resultCode, data);
                }
            }
        };
    }

    // Implement your deep link handling logic here
    private void handleDeepLink(Uri deepLink) {
        if (deepLink != null) {
            String scheme = deepLink.getScheme();
            String host = deepLink.getHost();
            String path = deepLink.getPath();

            if ("reactapp".equals(scheme) && "example.com".equals(host) && "/login".equals(path)) {
                // This is a deep link to the /login path of example.com with the reactapp scheme.
                // Handle it accordingly, e.g., open a login page.
                openLoginPage();
            }
        }
    }

    private void openLoginPage() {
        // Handle the deep link to the login page, e.g., navigate to the login screen.
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        if (getIntent() != null) {
            setIntent(intent); // Update the current intent with the new intent.
        }
    }

    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        permissionListener = listener;
        requestPermissions(permissions, requestCode);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (permissionListener != null) {
            permissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    // @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage()
            // Add other React packages here if needed
        );
    }
}
