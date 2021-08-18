package com.saraighatdigital;

//splash screen
import android.os.Bundle;
//

import com.facebook.react.ReactActivity;

//splash screen
import org.devio.rn.splashscreen.SplashScreen; 
//

public class MainActivity extends ReactActivity {
   //splash screen
    @Override
        protected void onCreate(Bundle savedInstanceState) {
            SplashScreen.show(this);  // here 
            super.onCreate(savedInstanceState);
        }
    //splash screen end

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SaraighatDigital";
  }
}
