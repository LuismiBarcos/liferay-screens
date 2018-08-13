package LiferayScreenlets.Auth.ForgotPassword;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.auth.BasicAuthMethod;
import com.liferay.mobile.screens.auth.forgotpassword.ForgotPasswordListener;
import com.liferay.mobile.screens.auth.forgotpassword.ForgotPasswordScreenlet;
import com.liferay.mobile.screens.auth.signup.SignUpScreenlet;
import com.liferay.mobile.screens.context.LiferayServerContext;

import org.json.JSONObject;

public class ForgotPasswordViewManager extends SimpleViewManager<ForgotPasswordScreenlet> implements ForgotPasswordListener{

    private final String NAME = "ForgotPasswordScreenlet";
    private ForgotPasswordScreenlet screenlet;
    private ThemedReactContext reactContext;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected ForgotPasswordScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new ForgotPasswordScreenlet(reactContext);
        this.screenlet.setCompanyId(LiferayServerContext.getCompanyId());
        this.screenlet.render(com.liferay.mobile.screens.R.layout.forgotpassword_default);
        this.screenlet.setBasicAuthMethod(BasicAuthMethod.EMAIL);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name="anonymousApiUserName")
    public void setAnonymousApiUserName(ForgotPasswordScreenlet forgotPasswordScreenlet, String anonymousApiUserName) {
        this.screenlet.setAnonymousApiUserName(anonymousApiUserName);
    }

    @ReactProp(name="anonymousApiPassword")
    public void setAnonymousApiPassword(ForgotPasswordScreenlet forgotPasswordScreenlet, String anonymousApiPassword) {
        this.screenlet.setAnonymousApiPassword(anonymousApiPassword);
    }

    // ForgotPasswordListener methods

    @Override
    public void onForgotPasswordRequestSuccess(boolean b) {
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putBoolean("passwordSent",b);
        this.sendEvent("onForgotPasswordRequestSuccess", event);
    }

    @Override
    public void onForgotPasswordRequestFailure(Exception e) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.getMessage());
        this.sendEvent("onForgotPasswordRequestFailure", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
