package LiferayScreenlets.Web;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.liferay.mobile.screens.web.WebListener;
import com.liferay.mobile.screens.web.WebScreenlet;
import com.liferay.mobile.screens.web.WebScreenletConfiguration;

public class WebScreenletViewManager extends SimpleViewManager<WebScreenlet> implements WebListener {

    private final String NAME = "WebScreenlet";
    private ThemedReactContext reactContext;
    private WebScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected WebScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new WebScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.web_default);
        this.screenlet.setListener(this);
        WebScreenletConfiguration configuration = new WebScreenletConfiguration.Builder("https://www.andorratelecom.ad/")
                .setWebType(WebScreenletConfiguration.WebType.OTHER)
                .load();
        this.screenlet.setWebScreenletConfiguration(configuration);
        this.screenlet.load();
        return this.screenlet;
    }

    // WebListener implementation

    @Override
    public void onPageLoaded(String s) {
        WritableMap event = Arguments.createMap();
        event.putString("page", s);
        this.sendEvent("onPageLoaded", event);
    }

    @Override
    public void onScriptMessageHandler(String s, String s1) {
        WritableMap event = Arguments.createMap();
        event.putString("message", s);
        this.sendEvent("onScriptMessageHandler", event);
    }

    @Override
    public void error(Exception e, String s) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.toString());
        this.sendEvent("onError", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
