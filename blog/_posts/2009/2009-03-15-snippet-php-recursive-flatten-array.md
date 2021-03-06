---
title: Snippet&colon; Php recursive flatten array
date: 2009-03-15
tags: php
category: dev
imported-from: old-blog
layout: post
guid: 2e269fcb-ff31-43c6-b752-0dfe5657c4d0
---
I wrote this nifty recursive function to flatten an array.

{% highlight php %}
function array_flatten($a){ 
    $flat = array();
    if (count($a)==1) {
        return $a;
    }
    foreach ($a as $i=>$j){
        $new_flat_array = array_flatten($j);
        if (count($new_flat_array)>1) {
            foreach ($new_flat_array as $item) {
                array_push($flat, $item);
            }
        } else {
            array_push($flat,$j);
        }
    }
    return $flat;
}

/* It will take something like this: */

$unFlat = array("the quick","has","jumped","over",
   array("brown","fox",
      array(0=>"the",1=>"lazy"),
   "dog"),
".");
print_r($unFlat);

/*
Array
(
    [0] => the quick
    [1] => has
    [2] => jumped
    [3] => over
    [4] => Array
        (
            [0] => brown
            [1] => fox
            [2] => Array
                (
                    [0] => the
                    [1] => lazy
                )

            [3] => dog
        )

    [5] => .
)

// and turn it into this: */

print_r(array_flatten($unFlat));

/*
Array
(
    [0] => the quick
    [1] => has
    [2] => jumped
    [3] => over
    [4] => brown
    [5] => fox
    [6] => the
    [7] => lazy
    [8] => dog
    [9] => .
)

*/
{% endhighlight %}

