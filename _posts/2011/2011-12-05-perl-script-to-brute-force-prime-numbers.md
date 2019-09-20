---
title: Perl Prime Finder
date: 2011-12-05 16:24:00 -0700
imported-from: gist
gist-url: https://gist.github.com/robacarp/1435885
category: dev
tags: perl
layout: post
guid: bad02e3c-9387-4b20-91d5-3cf872df09cc
---

Living in a house that is heated by wood and coal, I wake up to a laptop that is _cold_. I use this script to warm up my laptop when it's cold.

{% highlight perl %}
#!/usr/bin/perl
#this program generates $c prime numbers starting from the number 2

use Strict;
use warnings;
use POSIX;
sub genPrimes($$){
  my($ct,$advanced) = @_;
  my ($i,$possPrime,@primes,$j);
  $ct = 1 unless $ct;
  $possPrime =3; 
  @primes = (2);
  while (@primes<$ct) {
    $j=0;
    $div=0;
    if ($advanced) {
      while(!$div && $j<@primes && $primes[$j]<($possPrime/2) ){
        if ($possPrime % $primes[$j] == 0){
          $div=1;
        }
        $j++;
      }
    } else {
      while(!$div && $j<@primes){
        if ($possPrime % $primes[$j] == 0){
          $div=1;
        }
        $j++;
      }
    }
    $primes[@primes]=$possPrime unless $div;
    $possPrime+=2;
    if (@primes % 100 == 0){
      #print $#primes . "\n";
    }
  }
  return @primes;
}

sub convertTime($){
  local($time) = @_;
  print $time;
  $seconds = $time;
  $minutes = floor($time / 60);
  $hours = floor($minutes / 60);
  $seconds -= $minutes * 60;
  $minutes -= $hours * 60;
  return ($hours, $minutes, $seconds);
}

$ct = $ARGV[0];
$start = time();
@primes = genPrimes($ct,0);
$end = time();

foreach(@primes){
  print;
  print "\t";
}
print "\n";

$start = 
$end = 


@startTime = convertTime($start);
@endTime = convertTime($end);
@diffTime = convertTime($end - $start);


print "Start Time: " . $startTime[0] . ":" . $startTime[1] . ":" . $startTime[2] . "\n";
print "End Time: " . $endTime[0] . ":" . $endTime[1] . ":" . $endTime[2] . "\n";
print "Diff Time: " . $diffTime[0] . ":" . $diffTime[1] . ":" . $diffTime[2] . "\n";
{% endhighlight %}

