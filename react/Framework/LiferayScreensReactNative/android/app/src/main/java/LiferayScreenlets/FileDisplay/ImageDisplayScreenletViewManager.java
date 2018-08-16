package LiferayScreenlets.FileDisplay;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.asset.AssetEntry;
import com.liferay.mobile.screens.asset.display.AssetDisplayListener;
import com.liferay.mobile.screens.dlfile.display.image.ImageDisplayScreenlet;

import org.json.JSONObject;

public class ImageDisplayScreenletViewManager extends SimpleViewManager<ImageDisplayScreenlet> implements AssetDisplayListener{

    private final String NAME = "ImageDisplayScreenlet";
    private ThemedReactContext reactContext;
    private ImageDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected ImageDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new ImageDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.image_display_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    // ClassName is not necessary because is set by default in BaseFileDisplayScreenlet

//    @ReactProp(name = "className")
//    public void setClassName(ImageDisplayScreenlet screenlet, String className) {
//        this.screenlet.setClassName(className);
//        if(this.screenlet.getClassPK() != 0){
//            this.screenlet.load();
//        }
//    }

    @ReactProp(name = "classPK")
    public void setClassPK(ImageDisplayScreenlet screenlet, int classPK) {
        this.screenlet.setClassPK(classPK);
        if(this.screenlet.getClassName() != null){
            this.screenlet.load();
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
