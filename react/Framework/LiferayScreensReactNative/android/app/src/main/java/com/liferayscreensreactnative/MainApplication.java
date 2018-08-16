package com.liferayscreensreactnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import LiferayScreenlets.Auth.ForgotPassword.ForgotPasswordPackage;
import LiferayScreenlets.Auth.Login.LoginScreenletPackage;
import LiferayScreenlets.Auth.SignUp.SignUpScreenletPackage;
import LiferayScreenlets.Comment.Add.CommentAddScreenletPackage;
import LiferayScreenlets.Comment.Display.CommentDisplayScreenletPackage;
import LiferayScreenlets.Comment.List.CommnentListScreenletPackage;
import LiferayScreenlets.Context.SessionContextPackage;
import LiferayScreenlets.DDL.Form.DDLFormScreenletPackage;
import LiferayScreenlets.FileDisplay.AudioDisplayScreenletPackage;
import LiferayScreenlets.FileDisplay.ImageDisplayScreenletPackage;
import LiferayScreenlets.FileDisplay.VideoDisplayScreenletPackage;
import LiferayScreenlets.ImageGallery.ImageGalleryScreenletPackage;
import LiferayScreenlets.Rating.RatingScreenletPackage;
import LiferayScreenlets.UserPortrait.UserPortraitScreenletPackage;
import LiferayScreenlets.WebContent.Display.WebContentDisplayScreenletPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new LoginScreenletPackage(),
            new SessionContextPackage(),
            new UserPortraitScreenletPackage(),
            new ImageGalleryScreenletPackage(),
            new CommnentListScreenletPackage(),
            new SignUpScreenletPackage(),
            new RatingScreenletPackage(),
            new ForgotPasswordPackage(),
            new DDLFormScreenletPackage(),
            new WebContentDisplayScreenletPackage(),
            new ImageDisplayScreenletPackage(),
            new VideoDisplayScreenletPackage(),
            new AudioDisplayScreenletPackage(),
            new CommentDisplayScreenletPackage(),
            new CommentAddScreenletPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
