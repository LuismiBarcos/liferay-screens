package LiferayScreenlets.DDL.Form;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.ddl.form.DDLFormListener;
import com.liferay.mobile.screens.ddl.form.DDLFormScreenlet;
import com.liferay.mobile.screens.ddl.model.DocumentField;
import com.liferay.mobile.screens.ddl.model.Record;

import org.json.JSONObject;

import java.util.Map;

public class DDLFormScreenletViewManager extends SimpleViewManager<DDLFormScreenlet> implements DDLFormListener{

    private final String NAME = "DDLFormScreenlet";
    private ThemedReactContext reactContext;
    private DDLFormScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected DDLFormScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new DDLFormScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.ddl_form_default);
        this.screenlet.setRecord(new Record(this.screenlet.getResources().getConfiguration().locale));
        this.screenlet.setRecordId((com.liferay.mobile.screens.R.styleable.DDLFormScreenlet_recordId));
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "structureId")
    public void setStrucutreId(DDLFormScreenlet screenlet, int structureId){
        this.screenlet.setStructureId(structureId);
        if(this.screenlet.getRecordSetId() != 0) {
            this.screenlet.load();
        }
    }

    @ReactProp(name = "recordSetId")
    public void setRecordSetId(DDLFormScreenlet screenlet, int recordSetId){
        this.screenlet.setRecordSetId(recordSetId);
        if(this.screenlet.getStructureId() != 0) {
            this.screenlet.load();
        }
    }

    // DDLFormListener methods

    @Override
    public void onDDLFormLoaded(Record record) {
        JSONObject jsonObject = new JSONObject(record.getData());
        // Create map for params
        WritableMap event = Arguments.createMap();
        // Put data to map
        event.putString("record", jsonObject.toString());
        this.sendEvent("onDDLFormLoaded", event);
    }

    @Override
    public void onDDLFormRecordLoaded(Record record, Map<String, Object> map) {
        JSONObject jsonObject = new JSONObject(map);
        WritableMap event = Arguments.createMap();
        event.putString("map", jsonObject.toString());
        this.sendEvent("onDDLFormRecordLoaded", event);
    }

    @Override
    public void onDDLFormRecordAdded(Record record) {
        JSONObject jsonObject = new JSONObject(record.getData());
        WritableMap event = Arguments.createMap();
        event.putString("record", jsonObject.toString());
        this.sendEvent("onDDLFormRecordAdded", event);
    }

    @Override
    public void onDDLFormRecordUpdated(Record record) {
        JSONObject jsonObject = new JSONObject(record.getData());
        WritableMap event = Arguments.createMap();
        event.putString("record", jsonObject.toString());
        this.sendEvent("onDDLFormRecordUpdated", event);
    }

    @Override
    public void onDDLFormDocumentUploaded(DocumentField documentField, JSONObject jsonObject) {
        WritableMap event = Arguments.createMap();
        event.putString("documentField", jsonObject.toString());
        this.sendEvent("onDDLFormDocumentUploaded", event);
    }

    @Override
    public void onDDLFormDocumentUploadFailed(DocumentField documentField, Exception e) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.getMessage());
        this.sendEvent("onDDLFormDocumentUploadFailed", event);
    }

    @Override
    public void error(Exception e, String s) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.getMessage());
        this.sendEvent("onError", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
