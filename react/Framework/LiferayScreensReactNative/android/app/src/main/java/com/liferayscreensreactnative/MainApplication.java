package com.liferayscreensreactnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import LiferayScreenlets.Auth.Login.LoginScreenletPackage;
import LiferayScreenlets.Comment.List.CommnentListScreenletPackage;
import LiferayScreenlets.Context.SessionContextPackage;
import LiferayScreenlets.ImageGallery.ImageGalleryScreenletPackage;
import LiferayScreenlets.UserPortrait.UserPortraitScreenletPackage;

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
            new CommnentListScreenletPackage()
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
