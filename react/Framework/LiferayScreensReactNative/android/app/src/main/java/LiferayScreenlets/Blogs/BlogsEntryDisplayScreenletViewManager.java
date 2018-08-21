package LiferayScreenlets.Blogs;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.asset.AssetEntry;
import com.liferay.mobile.screens.asset.display.AssetDisplayListener;
import com.liferay.mobile.screens.blogs.BlogsEntryDisplayScreenlet;

import org.json.JSONObject;

public class BlogsEntryDisplayScreenletViewManager extends SimpleViewManager<BlogsEntryDisplayScreenlet> implements AssetDisplayListener {

    private final String NAME = "BlogsEntryDisplayScreenlet";
    private ThemedReactContext reactContext;
    private BlogsEntryDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected BlogsEntryDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new BlogsEntryDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.blogsentry_display_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "entryId")
    public void setEntryId(BlogsEntryDisplayScreenlet screenlet, int entryId) {
        this.screenlet.setEntryId(entryId);
        this.screenlet.load();
    }

    @ReactProp(name = "className")
    public void setClassName(BlogsEntryDisplayScreenlet screenlet, String className) {
        this.screenlet.setClassName(className);
        if(this.screenlet.getEntryId() != 0) {
            if (this.screenlet.getClassPK() != 0) {
                this.screenlet.load();
            }
        }
    }

    @ReactProp(name = "classPK")
    public void setClassPK(BlogsEntryDisplayScreenlet screenlet, int classPK) {
        this.screenlet.setClassPK(classPK);
        if(this.screenlet.getEntryId() == 0) {
            if (this.screenlet.getClassName() != null) {
                this.screenlet.load();
            }
        }
    }

    // AssetDisplayListener implementation

    @Override
    public void onRetrieveAssetSuccess(AssetEntry assetEntry) {
        JSONObject jsonObject = new JSONObject(assetEntry.getValues());
        WritableMap event = Arguments.createMap();
        event.putString("assetEntry", jsonObject.toString());
        this.sendEvent("onRetrieveAssetSuccess", event);
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
