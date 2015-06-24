package com.liferay.mobile.screens.viewsets.defaultviews.audiencetargeting;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.LinearLayout;

import com.liferay.mobile.screens.audiencetargeting.interactor.requestcontent.AudienceTargetingContentEvent;
import com.liferay.mobile.screens.audiencetargeting.view.AudienceTargetingViewModel;
import com.liferay.mobile.screens.util.LiferayLogger;
import com.liferay.mobile.screens.viewsets.defaultviews.LiferayCrouton;

/**
 * @author Javier Gamarra
 */
public class AudienceTargetingView extends LinearLayout implements AudienceTargetingViewModel {

	public AudienceTargetingView(Context context) {
		super(context);
	}

	public AudienceTargetingView(Context context, AttributeSet attributes) {
		super(context, attributes);
	}

	public AudienceTargetingView(Context context, AttributeSet attributes, int defaultStyle) {
		super(context, attributes, defaultStyle);
	}

	@Override
	public void showAudienceContent(final AudienceTargetingContentEvent event) {
		try {
			AudienceTargetingRenderer renderer = new AudienceTargetingRendererFactory()
				.getRenderer(event.getJSONObject());
			if (renderer != null) {
				View render = renderer.render(event.getJSONObject());
				if (render != null) {
					addView(render);
				}
			}
		}
		catch (Exception e) {
			LiferayLogger.e("Error loading document", e);
		}
	}

	@Override
	public void showStartOperation(String actionName) {

	}

	@Override
	public void showFinishOperation(String actionName) {
		LiferayLogger.i("Get Audience Targeting content successful");
	}

	@Override
	public void showFailedOperation(String actionName, Exception e) {
		String message = "Could not retrieve audience targeting content";
		LiferayLogger.e(message, e);
		LiferayCrouton.error(getContext(), message, e);
	}

	@Override
	protected void onFinishInflate() {
		super.onFinishInflate();

	}

}
