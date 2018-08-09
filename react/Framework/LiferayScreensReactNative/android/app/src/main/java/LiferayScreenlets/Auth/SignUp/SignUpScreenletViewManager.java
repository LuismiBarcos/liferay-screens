package LiferayScreenlets.Auth.SignUp;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.auth.signup.SignUpListener;
import com.liferay.mobile.screens.auth.signup.SignUpScreenlet;
import com.liferay.mobile.screens.context.LiferayServerContext;
import com.liferay.mobile.screens.context.User;
import com.liferayscreensreactnative.R;

import org.json.JSONObject;

public class SignUpScreenletViewManager extends SimpleViewManager<SignUpScreenlet> implements SignUpListener{

    private final String NAME = "SignUpScreenlet";
    private SignUpScreenlet screenlet;
    private ReactContext reactContext;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected SignUpScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new SignUpScreenlet(reactContext);
        this.screenlet.render(R.layout.sign_up_default);
        this.screenlet.setCompanyId(LiferayServerContext.getCompanyId());
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name="anonymousApiUserName")
    public void setAnonymousApiUserName(SignUpScreenlet signUpScreenlet, String anonymousApiUserName) {
        this.screenlet.setAnonymousApiUserName(anonymousApiUserName);
    }

    /// We have to change the name because in iOS create a conflict and do not work
    @ReactProp(name="anonymousApiPassword")
    public void setAnonymousApiPassword(SignUpScreenlet signUpScreenlet, String anonymousApiPassword) {
        this.screenlet.setAnonymousApiPassword(anonymousApiPassword);
    }

    // SignUpListener methods

    @Override
    public void onSignUpFailure(Exception e) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.getMessage());
        this.sendEvent("onSignUpFailure", event);
    }

    @Override
    public void onSignUpSuccess(User user) {
        JSONObject jsonObject = new JSONObject(user.getValues());
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("user", jsonObject.toString());
        this.sendEvent("onSignUpSuccess", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
