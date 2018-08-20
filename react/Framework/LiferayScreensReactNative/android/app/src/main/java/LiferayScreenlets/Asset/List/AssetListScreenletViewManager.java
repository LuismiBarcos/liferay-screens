package LiferayScreenlets.Asset.List;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.asset.list.AssetListScreenlet;
import com.liferay.mobile.screens.base.list.BaseListListener;
import com.liferay.mobile.screens.context.LiferayServerContext;
import com.liferay.mobile.screens.context.SessionContext;
import com.liferay.mobile.screens.dlfile.display.audio.AudioDisplayScreenlet;
import com.liferay.mobile.screens.util.LiferayLocale;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Locale;

public class AssetListScreenletViewManager extends SimpleViewManager<AssetListScreenlet> implements BaseListListener{

    private final String NAME = "AssetListScreenlet";
    private ThemedReactContext reactContext;
    private AssetListScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected AssetListScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new AssetListScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.asset_list_default);
        this.screenlet.setListener(this);
        initializeDefaultValues();
        return this.screenlet;
    }

    private void initializeDefaultValues() {
        this.screenlet.setAutoLoad(true);
        this.screenlet.setGroupId(LiferayServerContext.getGroupId());
        this.screenlet.setFirstPageSize(50);
        this.screenlet.setPageSize(25);
        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
    }

    @ReactProp(name = "classNameId")
    public void setClassNameId(AssetListScreenlet screenlet, int classNameId) {
        this.screenlet.setClassNameId(classNameId);
        this.screenlet.loadPage(0);
    }

    @ReactProp(name = "portletItemName")
    public void setPortletItemName(AssetListScreenlet screenlet, String portletItemName) {
        this.screenlet.setPortletItemName(portletItemName);
        if(this.screenlet.getClassNameId() == 0){
            this.screenlet.loadPage(0);
        }
    }

    // BaseListListener implementation

    @Override
    public void onListPageFailed(int i, Exception e) {
        WritableMap event = Arguments.createMap();
        event.putInt("pageNumber", i);
        event.putString("error", e.toString());
        this.sendEvent("onListPageFailed", event);
    }

    @Override
    public void onListPageReceived(int i, int i1, List list, int i2) {
        WritableMap event = Arguments.createMap();
        event.putString("list", list.toString());
        this.sendEvent("onListPageReceived", event);
    }

    @Override
    public void onListItemSelected(Object o, View view) {
        WritableMap event = Arguments.createMap();
        event.putString("itemSelected", o.toString());
        this.sendEvent("onListItemSelected", event);
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
