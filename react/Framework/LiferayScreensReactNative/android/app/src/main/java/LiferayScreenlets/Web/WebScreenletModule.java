package LiferayScreenlets.Web;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewManager;
import com.liferay.mobile.screens.web.WebScreenlet;

public class WebScreenletModule extends ReactContextBaseJavaModule {

    private final String NAME = "WebScreenlet";
    private WebScreenlet screenlet;
    private ReactApplicationContext reactContext;

    public WebScreenletModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void test(String props) {
        Log.d("tag","calling method");
        WebScreenletViewManager nativeModule = this.reactContext.getNativeModule(WebScreenletViewManager.class);
        

    }
}
