package LiferayScreenlets.Comment.Add;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.liferay.mobile.screens.comment.CommentEntry;
import com.liferay.mobile.screens.comment.add.CommentAddListener;
import com.liferay.mobile.screens.comment.add.CommentAddScreenlet;

import org.json.JSONObject;

public class CommentAddScreenletViewManager extends SimpleViewManager<CommentAddScreenlet> implements CommentAddListener{

    private final String NAME = "CommentAddScreenlet";
    private ThemedReactContext reactContext;
    private CommentAddScreenlet screenlet;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected CommentAddScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new CommentAddScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.comment_add_default);
        this.screenlet.setListener(this);
        return this.screenlet;
    }

    @ReactProp(name = "className")
    public void setClassName(CommentAddScreenlet screenlet, String className) {
        this.screenlet.setClassName(className);
    }

    @ReactProp(name = "classPK")
    public void setClassPK(CommentAddScreenlet screenlet, int classPK) {
        this.screenlet.setClassPK(classPK);
    }

    // CommentAddListener implementation

    @Override
    public void onAddCommentSuccess(CommentEntry commentEntry) {
        JSONObject jsonObject = new JSONObject(commentEntry.getValues());
        WritableMap event = Arguments.createMap();
        event.putString("comment", jsonObject.toString());
        this.sendEvent("onAddCommentSuccess", event);
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
