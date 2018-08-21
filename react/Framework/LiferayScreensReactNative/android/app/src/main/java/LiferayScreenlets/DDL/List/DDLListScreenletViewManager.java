package LiferayScreenlets.DDL.List;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.base.list.BaseListListener;
import com.liferay.mobile.screens.context.LiferayServerContext;
import com.liferay.mobile.screens.ddl.list.DDLListScreenlet;
import com.liferay.mobile.screens.util.LiferayLocale;
import com.liferay.mobile.screens.util.LiferayLogger;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class DDLListScreenletViewManager extends SimpleViewManager<DDLListScreenlet> implements BaseListListener {

    private final String NAME = "DDLListScreenlet";
    private ThemedReactContext reactContext;
    private DDLListScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected DDLListScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new DDLListScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.ddl_list_default);
        this.screenlet.setListener(this);
        initializeDefaultValues();
        return this.screenlet;
    }

    private void initializeDefaultValues() {
        this.screenlet.setLabelFields(parse(""));
        this.screenlet.setAutoLoad(false);
        this.screenlet.setGroupId(LiferayServerContext.getGroupId());
        this.screenlet.setFirstPageSize(50);
        this.screenlet.setPageSize(25);
        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
    }

    @ReactProp(name = "recordSetId")
    public void setrecordSetId(DDLListScreenlet screenlet, int recordSetId) {
        this.screenlet.setRecordSetId(recordSetId);
        this.screenlet.loadPage(0);
    }

    @ReactProp(name = "labelFields")
    public void setLabelFields(DDLListScreenlet screenlet, String labelFields) {
        this.screenlet.setLabelFields(parse(labelFields));
        if(this.screenlet.getRecordSetId() != 0) {
            this.screenlet.loadPage(0);
        }
    }

    private List<String> parse(String labelFields) {
        if (labelFields == null) {
            LiferayLogger.e("No labelFields configured");
            labelFields = "";
        }

        List<String> parsedFields = new ArrayList();
        String[] var3 = labelFields.split(",");
        int var4 = var3.length;

        for (int var5 = 0; var5 < var4; ++var5) {
            String text = var3[var5];
            parsedFields.add(text.trim());
        }

        return parsedFields;
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