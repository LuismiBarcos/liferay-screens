package LiferayScreenlets.FileDisplay;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.asset.AssetEntry;
import com.liferay.mobile.screens.dlfile.display.video.VideoDisplayListener;
import com.liferay.mobile.screens.dlfile.display.video.VideoDisplayScreenlet;

import org.json.JSONObject;

public class VideoDisplayScreenletViewManager extends SimpleViewManager<VideoDisplayScreenlet> implements VideoDisplayListener{

    private final String NAME = "VideoDisplayScreenlet";
    private ThemedReactContext reactContext;
    private VideoDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected VideoDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new VideoDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.video_display_default);
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
    public void setClassPK(VideoDisplayScreenlet screenlet, int classPK) {
        this.screenlet.setClassPK(classPK);
        if(this.screenlet.getClassName() != null){
            this.screenlet.load();
        }
    }

    // VideoDisplayListener implementation

    @Override
    public void onVideoPrepared() {
        WritableMap event = Arguments.createMap();
        event.putString("status", "video prepared");
        this.sendEvent("onVideoPrepared", event);
    }

    @Override
    public void onVideoError(Exception e) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.toString());
        this.sendEvent("onVideoError", event);
    }

    @Override
    public void onVideoCompleted() {
        WritableMap event = Arguments.createMap();
        event.putString("status", "video completed");
        this.sendEvent("onVideoCompleted", event);
    }

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
