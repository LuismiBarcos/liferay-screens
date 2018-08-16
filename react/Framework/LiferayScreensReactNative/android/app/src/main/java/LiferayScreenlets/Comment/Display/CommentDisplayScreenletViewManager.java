package LiferayScreenlets.Comment.Display;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.comment.CommentEntry;
import com.liferay.mobile.screens.comment.display.CommentDisplayListener;
import com.liferay.mobile.screens.comment.display.CommentDisplayScreenlet;

import org.json.JSONObject;

public class CommentDisplayScreenletViewManager extends SimpleViewManager<CommentDisplayScreenlet> implements CommentDisplayListener{

    private final String NAME = "CommentDisplayScreenlet";
    private ThemedReactContext reactContext;
    private CommentDisplayScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected CommentDisplayScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new CommentDisplayScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.comment_display_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "commentId")
    public void setCommentId(CommentDisplayScreenlet screenlet, int commentId) {
        this.screenlet.setCommentId(commentId);
        this.screenlet.load();
    }

    // CommentDisplayListener implementation

    @Override
    public void onLoadCommentSuccess(CommentEntry commentEntry) {
        JSONObject jsonObject = new JSONObject(commentEntry.getValues());
        WritableMap event = Arguments.createMap();
        event.putString("comment", jsonObject.toString());
        this.sendEvent("onLoadCommentSuccess", event);
    }

    @Override
    public void onDeleteCommentSuccess(CommentEntry commentEntry) {
        JSONObject jsonObject = new JSONObject(commentEntry.getValues());
        WritableMap event = Arguments.createMap();
        event.putString("comment", jsonObject.toString());
        this.sendEvent("onDeleteCommentSuccess", event);
    }

    @Override
    public void onUpdateCommentSuccess(CommentEntry commentEntry) {
        JSONObject jsonObject = new JSONObject(commentEntry.getValues());
        WritableMap event = Arguments.createMap();
        event.putString("comment", jsonObject.toString());
        this.sendEvent("onUpdateCommentSuccess", event);
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
