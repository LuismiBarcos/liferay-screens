package LiferayScreenlets.ImageGallery;

import android.net.Uri;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.imagegallery.ImageGalleryListener;
import com.liferay.mobile.screens.imagegallery.ImageGalleryScreenlet;
import com.liferay.mobile.screens.imagegallery.model.ImageEntry;
import com.liferay.mobile.screens.util.LiferayLocale;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Locale;
import java.util.Map;

public class ImageGalleryScreenletViewManager extends SimpleViewManager<ImageGalleryScreenlet> implements ImageGalleryListener{

    private final String NAME = "ImageGalleryScreenlet";
    private ReactContext reactContext;
    private ImageGalleryScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected ImageGalleryScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
//        this.screenlet = new ImageGalleryScreenlet(reactContext);
//        this.screenlet.render(com.liferay.mobile.screens.R.layout.gallery_default);
//        this.screenlet.setListener(this);
//        this.screenlet.setFirstPageSize(50);
//        this.screenlet.setPageSize(25);
//        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
        this.screenlet= new ImageGalleryScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.gallery_default);
        this.screenlet.setRepositoryId(20143);
        this.screenlet.setFolderId(72155);
        this.screenlet.setListener(this);
        this.screenlet.setFirstPageSize(50);
        this.screenlet.setPageSize(25);
        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
        this.screenlet.load();
        return this.screenlet;
    }

    @ReactProp(name="folderId")
    public void setFolderId(ImageGalleryScreenlet screenlet, double folderId) {
        this.screenlet.setFolderId((long) folderId);
        if(this.screenlet.getRepositoryId() != 0) {
            this.screenlet.load();
        }
    }

    @ReactProp(name="repositoryId")
    public void setRepositoryId(ImageGalleryScreenlet screenlet, double repositoryId) {
        this.screenlet.setRepositoryId((long) repositoryId);
        if(this.screenlet.getFolderId() != 0) {
            this.screenlet.load();
        }
    }

    // ImageGalleryListener methods

    @Override
    public void onImageEntryDeleted(long l) {

    }

    @Override
    public void onImageUploadStarted(Uri uri, String s, String s1, String s2) {

    }

    @Override
    public void onImageUploadProgress(int i, int i1) {

    }

    @Override
    public void onImageUploadEnd(ImageEntry imageEntry) {

    }

    @Override
    public boolean showUploadImageView(String s, Uri uri, int i) {
        return false;
    }

    @Override
    public int provideImageUploadDetailView() {
        return 0;
    }

    @Override
    public void onListPageFailed(int i, Exception e) {
        WritableMap event = Arguments.createMap();
        event.putString("error", e.toString());
        this.sendEvent("onListPageFailed", event);
    }

    @Override
    public void onListPageReceived(int i, int i1, List<ImageEntry> list, int i2) {
        WritableMap event = Arguments.createMap();
        JSONArray jsonArray = new JSONArray();
        for (ImageEntry image:
                list) {
            jsonArray.put(image.getValues());
        }
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("images", jsonArray);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        event.putString("images", jsonObject.toString());
        this.sendEvent("onListPageReceived", event);
    }

    @Override
    public void onListItemSelected(ImageEntry imageEntry, View view) {
        WritableMap event = Arguments.createMap();
        event.putString("item", new JSONObject(imageEntry.getValues()).toString());
        this.sendEvent("onItemSelected", event);
    }

    @Override
    public void error(Exception e, String s) {
        WritableMap event = Arguments.createMap();
        event.putString("error", s);
        this.sendEvent("onImageGalleryError", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
