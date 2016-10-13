package com.liferay.mobile.screens.dlfile.display.image;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import com.liferay.mobile.screens.R;
import com.liferay.mobile.screens.dlfile.display.BaseFileDisplayScreenlet;
import com.liferay.mobile.screens.viewsets.defaultviews.dlfile.display.ImageDisplayView;

/**
 * @author Sarai Díaz García
 */
public class ImageDisplayScreenlet extends BaseFileDisplayScreenlet<ImageDisplayViewModel> {

	private ImageView.ScaleType scaleType;
	private int placeholder;

	public ImageDisplayScreenlet(Context context) {
		super(context);
	}

	public ImageDisplayScreenlet(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	public ImageDisplayScreenlet(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
	}

	public ImageDisplayScreenlet(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
		super(context, attrs, defStyleAttr, defStyleRes);
	}

	@Override
	protected View createScreenletView(Context context, AttributeSet attributes) {
		TypedArray typedArray =
			context.getTheme().obtainStyledAttributes(attributes, R.styleable.ImageDisplayScreenlet, 0, 0);

		placeholder = typedArray.getResourceId(R.styleable.ImageDisplayScreenlet_placeholder, 0);

		Integer scaleTypeAttribute = typedArray.getInteger(R.styleable.ImageDisplayScreenlet_imageScaleType,
			ImageView.ScaleType.CENTER_CROP.ordinal());
		scaleType = ImageView.ScaleType.values()[scaleTypeAttribute];

		typedArray.recycle();

		View view = super.createScreenletView(context, attributes);

		((ImageDisplayView) view).setScaleType(scaleType);
		((ImageDisplayView) view).setPlaceholder(placeholder);

		return view;
	}

	public ImageView.ScaleType getScaleType() {
		return scaleType;
	}

	public int getPlaceholder() {
		return placeholder;
	}

	public void setScaleType(ImageView.ScaleType scaleType) {
		this.scaleType = scaleType;
		getViewModel().setScaleType(scaleType);
	}

	public void setPlaceholder(int placeholder) {
		this.placeholder = placeholder;
		getViewModel().setPlaceholder(placeholder);
	}
}