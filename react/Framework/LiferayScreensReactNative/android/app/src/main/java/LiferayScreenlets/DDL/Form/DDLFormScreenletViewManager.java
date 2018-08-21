package LiferayScreenlets.DDL.Form;

import android.content.Context;
import android.content.res.TypedArray;
import android.media.MediaCas;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.context.LiferayScreensContext;
import com.liferay.mobile.screens.context.LiferayServerContext;
import com.liferay.mobile.screens.context.SessionContext;
import com.liferay.mobile.screens.ddl.form.DDLFormListener;
import com.liferay.mobile.screens.ddl.form.DDLFormScreenlet;
import com.liferay.mobile.screens.ddl.form.view.DDLFormViewModel;
import com.liferay.mobile.screens.ddl.model.DocumentField;
import com.liferay.mobile.screens.ddl.model.Field;
import com.liferay.mobile.screens.ddl.model.Record;
import com.liferay.mobile.screens.util.LiferayLocale;

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
        initializeDefaultValues();
        return this.screenlet;
    }

    private void initializeDefaultValues(){
        this.screenlet.setAutoLoad(true);
        this.screenlet.setAutoScrollOnValidation(true);
        this.screenlet.setUpdateEnabled(true);
        Record record = new Record(LiferayLocale.getDefaultLocale());
        record.setRecordId(0);
        record.setCreatorUserId(0);
        this.screenlet.setRecord(record);
        this.screenlet.setFilePrefix(null);
        this.screenlet.setRecordId(0);
        this.screenlet.setFolderId(0);

        DDLFormViewModel viewModel = (DDLFormViewModel) this.screenlet.getChildAt(0);
        viewModel.setFieldLayoutId(Field.EditorType.CHECKBOX, com.liferay.mobile.screens.R.layout.ddlfield_checkbox_default);
        viewModel.setFieldLayoutId(Field.EditorType.DATE, com.liferay.mobile.screens.R.layout.ddlfield_date_default);
        viewModel.setFieldLayoutId(Field.EditorType.NUMBER, com.liferay.mobile.screens.R.layout.ddlfield_number_default);
        viewModel.setFieldLayoutId(Field.EditorType.INTEGER, com.liferay.mobile.screens.R.layout.ddlfield_number_default);
        viewModel.setFieldLayoutId(Field.EditorType.DECIMAL, com.liferay.mobile.screens.R.layout.ddlfield_number_default);
        viewModel.setFieldLayoutId(Field.EditorType.RADIO, com.liferay.mobile.screens.R.layout.ddlfield_radio_default);
        viewModel.setFieldLayoutId(Field.EditorType.SELECT, com.liferay.mobile.screens.R.layout.ddlfield_select_default);
        viewModel.setFieldLayoutId(Field.EditorType.TEXT, com.liferay.mobile.screens.R.layout.ddlfield_text_default);
        viewModel.setFieldLayoutId(Field.EditorType.TEXT_AREA, com.liferay.mobile.screens.R.layout.ddlfield_text_area_default);
        viewModel.setFieldLayoutId(Field.EditorType.DOCUMENT, com.liferay.mobile.screens.R.layout.ddlfield_document_default);
        viewModel.setFieldLayoutId(Field.EditorType.GEO, com.liferay.mobile.screens.R.layout.ddlfield_geo_default);
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
