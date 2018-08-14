package LiferayScreenlets.WebContent.Display;

import android.content.res.TypedArray;
import android.view.MotionEvent;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.context.LiferayServerContext;
import com.liferay.mobile.screens.util.LiferayLocale;
import com.liferay.mobile.screens.webcontent.WebContent;
import com.liferay.mobile.screens.webcontent.display.WebContentDisplayListener;
import com.liferay.mobile.screens.webcontent.display.WebContentDisplayScreenlet;

import org.json.JSONObject;

import java.util.Locale;

public class WebContentDisplayViewManager extends SimpleViewManager<WebContentDisplayScreenlet> implements WebContentDisplayListener{

    private final String NAME = "WebContentDisplayScreenlet";
    private ThemedReactContext reactContext;
    private WebContentDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected WebContentDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new WebContentDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.webcontentdisplay_default);
        this.screenlet.setListener(this);
        initializeDefaultValues();
        return this.screenlet;
    }

    private void initializeDefaultValues() {
        this.screenlet.setAutoLoad(true);
        this.screenlet.setStructureId((long) 0);
        this.screenlet.setLabelFields(String.valueOf(com.liferay.mobile.screens.R.styleable.WebContentDisplayScreenlet_labelFields));
        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
        this.screenlet.setJavascriptEnabled(false);
        this.screenlet.setGroupId(LiferayServerContext.getGroupId());
    }

    @ReactProp(name = "articleId")
    public void setArticleId(WebContentDisplayScreenlet screenlet, String articleId){
        this.screenlet.setArticleId(articleId);
        
    }

    // WebContentDisplayListener methods

    @Override
    public WebContent onWebContentReceived(WebContent webContent) {
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("html", webContent.getHtml());
        this.sendEvent("onWebContentReceived", event);
        return webContent;
    }

    @Override
    public boolean onUrlClicked(String s) {
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("url", s);
        this.sendEvent("onUrlClicked", event);
        return false;
    }

    @Override
    public boolean onWebContentTouched(View view, MotionEvent motionEvent) {
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("touched", motionEvent.toString());
        this.sendEvent("onWebContentTouched", event);
        return false;
    }

    @Override
    public void error(Exception e, String s) {
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("error", e.getMessage());
        this.sendEvent("onError", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
