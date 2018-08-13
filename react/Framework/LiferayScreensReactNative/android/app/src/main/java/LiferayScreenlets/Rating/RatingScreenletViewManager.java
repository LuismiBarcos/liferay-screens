package LiferayScreenlets.Rating;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.rating.AssetRating;
import com.liferay.mobile.screens.rating.RatingListener;
import com.liferay.mobile.screens.rating.RatingScreenlet;

public class RatingScreenletViewManager extends SimpleViewManager<RatingScreenlet> implements RatingListener{

    private final String NAME = "RatingScreenlet";
    private ThemedReactContext reactContext;
    private RatingScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected RatingScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new RatingScreenlet(reactContext);
        this.screenlet.setAutoLoad(false);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.rating_like_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "entryId", defaultInt = -1)
    public void setEntryId(RatingScreenlet screenlet, int entryId) {
        this.screenlet.setEntryId(entryId);
        this.screenlet.load();
    }

    @ReactProp(name = "className")
    public void setClassName(RatingScreenlet screenlet, String className) {
        screenlet.setClassName(className);
        if(screenlet.getClassPK() != 0){
            this.screenlet.load();
        }
    }

    @ReactProp(name = "classPK")
    public void setClassPK(RatingScreenlet screenlet, int classPK) {
        screenlet.setClassPK(classPK);
        if(this.screenlet.getClassName() != null){
            this.screenlet.load();
        }
    }

    // RatingListener methods

    @Override
    public void onRatingOperationSuccess(AssetRating assetRating) {
//        JSONObject jsonObject = new JSONObject(user.getValues());
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("user", assetRating.toString());
        this.sendEvent("onRatingOperationSuccess", event);
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
