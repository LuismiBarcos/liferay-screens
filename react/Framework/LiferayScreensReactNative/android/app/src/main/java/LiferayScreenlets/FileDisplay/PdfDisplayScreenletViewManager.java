package LiferayScreenlets.FileDisplay;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.asset.AssetEntry;
import com.liferay.mobile.screens.asset.display.AssetDisplayListener;
import com.liferay.mobile.screens.dlfile.display.pdf.PdfDisplayScreenlet;

import org.json.JSONObject;

public class PdfDisplayScreenletViewManager extends SimpleViewManager<PdfDisplayScreenlet> implements AssetDisplayListener{

    private final String NAME = "PdfDisplayScreenlet";
    private ThemedReactContext reactContext;
    private PdfDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected PdfDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new PdfDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.pdf_display_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "classPK")
    public void setClassPK(PdfDisplayScreenlet screenlet, int classPK) {
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
