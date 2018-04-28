---
title: An Arduino test framework
date: 2015-06-29 14:46:00 -0600
tags: arduino testing
category: dev
imported-from: gist
gist-url: https://gist.github.com/robacarp/e4cf62bc125d41bcc4e4
layout: post
guid: 4b07d02d-453b-4100-b92b-98c0b18c69df
---

Testing is very undervalued in the Arduino community. Perhaps because without simulators, testing inevitably comes up short. I'll conceded that it's difficult to test the hardware with software, but I maintain that testing the algorithms present in well structured Arduino code is possible and beneficial. This is a sample of testing code which I used at power on in [the puzzle box](https://github.com/robacarp/ringbox_puzzle) I used to propose.

    // Minimal testing framework
    #define b(v)   // Serial.println( v ? "true" : "false" );
    #define p(a)   // Serial.print(a);
    #define q(a,b) // Serial.print(a,b);

    boolean tests_pass = true;

    void assert(bool test){
      if (test) {
        p('.');
      } else {
        tests_pass = false;
        p('#');
      }
    }

    bool test_tests(){
      if ( ! tests_pass ) return false;
      assert(false);
      if ( tests_pass ) return false;
      tests_pass = true;

      return tests_pass;
    }

    // run the test method, and when things fail, put the Arduino into a lock and blink the LED
    void test_lock(){
      p("\n\nSelf Test:");
      bool result = test();

      if ( result ) {
        gps.reset();

        p(": Pass\n");
        digitalWrite(13, HIGH);
        delay(500);
        digitalWrite(13, LOW);
        delay(50);
        digitalWrite(13, HIGH);
        delay(50);
        digitalWrite(13, LOW);

        return;
      }

      // heartbeat blinkenlight on fail
      unsigned int mils;
      while( true ) {
        mils = millis() % 500;
        if (mils > 100 && mils < 150 ||
            mils > 200 && mils < 250
        ) {
          digitalWrite(13, true);
        } else {
          digitalWrite(13, false);
        }
      }
    }

    // Test dispatch method which activates individual test groups
    bool test(){
      return test_tests() && test_state_machine() && test_gps() && test_music();
    }

    /* Should be hooked into setup() like this: */

    void setup(){
      Serial.begin(115200);
      pinMode(13, OUTPUT);
      test_lock();
    }




    /*
     * Project specific tests. Example pulled from github.com/robacarp/ringbox_puzzle :
     */


    bool test_state_machine() {
      // not passing initially
      assert( ! password.completed() );

      // random advances don't do anything
      password.advance_state(0x8);
      password.advance_state(0x3);
      assert( password.current_state() == 0 );

      // advancing state once, then resetting with an incorrect value
      password.advance_state(0x1);
      assert( password.current_state() == 1 );
      password.advance_state(0x8);
      assert( password.current_state() == 0 );

      // the first number multiple times
      password.advance_state(0x1);
      password.advance_state(0x1);
      assert( password.current_state() == 1 );
      password.advance_state(0x1);
      assert( password.current_state() == 1 );

      // first, second, third, first
      password.advance_state(0x1);
      assert( password.current_state() == 1 );
      assert( ! password.completed() );

      password.advance_state(0x2);
      assert( password.current_state() == 2 );
      assert( ! password.completed() );

      password.advance_state(0x4);
      assert( password.current_state() == 3 );
      assert( ! password.completed() );

      password.advance_state(0x1);
      assert( password.current_state() == 1 );
      assert( ! password.completed() );

      // correct password
      password.reset();
      assert( ! password.completed() );

      password.advance_state(0x1);
      password.advance_state(0x2);
      password.advance_state(0x4);
      password.advance_state(0x8);
      assert( password.current_state() >= 4 );

      assert( password.completed() );

      password.reset();

      return tests_pass;
    }

    // Negative Longitude is West.
    // Negative Latitude is South.
    // Testing the haversine to be accurate to <1% error
    bool test_gps(){
      double distance, lat_a, lon_a, lat_b, lon_b, lat_c, lon_c, expected, delta;
      // 41.6076N, 88.2037W
      // 35.1346N, 85.3584W
      // 760.2 km says wolframalpha
      lat_a = 41.6076;
      lon_a = -88.2037;
      lat_b = 35.1346;
      lon_b = -85.3584;
      distance = GPS::coordinate_distance(lat_a, lon_a, lat_b, lon_b);
      expected = 760.2;
      delta = 760.2 - distance;
      assert(delta / expected < 0.01);

      // 41.6076N, 88.2037W
      // 41.6507N, 88.2555W
      // 6.442 km
      lat_a = 41.6076;
      lon_a = -88.2037;
      lat_b = 41.6507;
      lon_b = -88.2555;
      distance = GPS::coordinate_distance(lat_a, lon_a, lat_b, lon_b);
      expected = 6.442;
      delta = expected - distance;
      assert(delta / expected < 0.01);


      // test that we can enter the target destination and we actually unlock
      lat_c = 35.1346;
      lon_c = -85.3584;

      gps.target_latitude = lat_a;
      gps.target_longitude = lon_a;
      gps.precision = 3;
      gps.sentences = 3;

      // ~760km
      gps.latitude = lat_c;
      gps.longitude = lon_c;
      gps.distance_to_target();
      assert( ! gps.at_target() );

      // ~6km
      gps.latitude = lat_b;
      gps.longitude = lon_b;
      gps.distance_to_target();
      assert( ! gps.at_target() );

      // <1km
      gps.latitude = lat_a;
      gps.longitude = lon_a;
      gps.distance_to_target();
      assert( gps.at_target() );

      return tests_pass;
    }

    bool test_music(){
      assert( C == 32.7 );
      assert( NOTE(C, 2) == 65.4 );
      assert( NOTE(A, 4) == 440.0 );
      assert( PWM_WAIT( NOTE( C, 3 ) ) == 3822 );
      assert( PWM_WAIT( NOTE( A, 4 ) ) == 1136 );
      return tests_pass;
    }


As with every time I've had a suite of tests for a project I was working on, the time saved was far more than the time spent. Little tweaks to different algorithms have knock on effects that aren't easily reasoned about.
