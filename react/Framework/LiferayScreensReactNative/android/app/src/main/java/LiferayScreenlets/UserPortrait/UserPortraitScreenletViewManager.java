package LiferayScreenlets.UserPortrait;

import android.graphics.Bitmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.context.User;
import com.liferay.mobile.screens.userportrait.UserPortraitListener;
import com.liferay.mobile.screens.userportrait.UserPortraitScreenlet;

import org.json.JSONObject;

public class UserPortraitScreenletViewManager extends SimpleViewManager<UserPortraitScreenlet> implements UserPortraitListener{

    private final String NAME = "UserPortraitScreenlet";
    private ReactContext reactContext;
    private UserPortraitScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected UserPortraitScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new UserPortraitScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.userportrait_default);
        this.screenlet.setListener(this);
        this.screenlet.load();
        return this.screenlet;
    }

    @ReactProp(name="editable")
    public void setEditable(UserPortraitScreenlet screenlet, boolean editable){
        this.screenlet.setEditable(editable);
//        this.screenlet.load();
    }

    @ReactProp(name="userId")
    public void setUserId(UserPortraitScreenlet screenlet, double userId) {
        this.screenlet.setUserId((long) userId);
        this.screenlet.load();
    }

    // UserPortraitListener methods
    @Override
    public Bitmap onUserPortraitLoadReceived(Bitmap bitmap) {
        WritableMap event = Arguments.createMap();
        int imageSize = bitmap.getRowBytes() * bitmap.getHeight();
        event.putInt("image", imageSize);
        this.sendEvent("onUserPortraitLoadReceived", event);
        return bitmap;
    }

    @Override
    public void onUserPortraitUploaded() {
        WritableMap event = Arguments.createMap();
        event.putBoolean("userPortraitLoadReceived", true);
        this.sendEvent("onUserPortraitUploaded", event);
    }

    @Override
    public void error(Exception e, String s) {
        WritableMap event = Arguments.createMap();
        event.putString("error", s);
        this.sendEvent("onUserPortraitError", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
