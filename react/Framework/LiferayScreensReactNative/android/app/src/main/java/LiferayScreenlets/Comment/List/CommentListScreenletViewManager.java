package LiferayScreenlets.Comment.List;

import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.liferay.mobile.screens.comment.CommentEntry;
import com.liferay.mobile.screens.comment.list.CommentListListener;
import com.liferay.mobile.screens.comment.list.CommentListScreenlet;
import com.liferay.mobile.screens.util.LiferayLocale;
import com.liferayscreensreactnative.R;

import java.util.List;
import java.util.Locale;

public class CommentListScreenletViewManager extends SimpleViewManager<CommentListScreenlet> implements CommentListListener{

    private final String NAME = "CommentListScreenlet";
    private CommentListScreenlet screenlet;
    private ReactContext reactContext;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected CommentListScreenlet createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;
        this.screenlet = new CommentListScreenlet(reactContext);
        this.screenlet.render(com.liferay.mobile.screens.R.layout.comment_list_default);
        this.screenlet.setListener(this);
        this.screenlet.setClassName("com.liferay.document.library.kernel.model.DLFileEntry");
        this.screenlet.setClassPK(74606);
        this.screenlet.setAutoLoad(true);
        this.screenlet.setFirstPageSize(50);
        this.screenlet.setPageSize(25);
        this.screenlet.setLocale(new Locale(LiferayLocale.getDefaultSupportedLocale()));
        return this.screenlet;
    }

    // CommentListListener methods

    @Override
    public void onDeleteCommentSuccess(CommentEntry commentEntry) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);
    }

    @Override
    public void onUpdateCommentSuccess(CommentEntry commentEntry) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);
    }

    @Override
    public void onListPageFailed(int i, Exception e) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);
    }

    @Override
    public void onListPageReceived(int i, int i1, List<CommentEntry> list, int i2) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);

        RecyclerView recyclerView = (RecyclerView) this.screenlet.findViewById(R.id.liferay_recycler_list);
        recyclerView.getAdapter().notifyDataSetChanged();
        recyclerView.getAdapter().notifyItemInserted(0);

    }

    @Override
    public void onListItemSelected(CommentEntry commentEntry, View view) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);
    }

    @Override
    public void error(Exception e, String s) {
        WritableMap event = Arguments.createMap();
        event.putInt("image", 3);
        this.sendEvent("test", event);
    }

    private void sendEvent(String eventName ,WritableMap event ){
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, event);
    }
}
