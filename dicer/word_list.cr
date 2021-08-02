class Dicer::WordList
  Adjectives = %w|
    abrupt acceptable acidic adorable adventurous aggressive
    agitated alert aloof amiable amused annoyed antsy anxious
    appalling appetizing apprehensive arrogant ashamed
    astonishing attractive average batty beefy beloved
    bewildered biting bitter bland blushing bored brave
    bright broad bulky burly charming cheeky cheerful chubby
    clean clear cloudy clueless clumsy colorful colossal
    combative comfortable condemned condescending confused
    contemplative convincing convoluted cooperative corny
    costly courageous crabby creepy crooked cruel cumbersome
    curved cynical dangerous dashing decayed deceitful deep
    defeated defiant delicious delightful depraved depressed
    despicable determined dilapidated diminutive disgusted
    distinct distraught distressed disturbed dizzy drab
    drained dull durable eager ecstatic elated elegant
    emaciated embarrassed enchanting encouraging
    energetic energetic enormous enthusiastic envious
    exasperated excited exhilarated extensive exuberant fancy
    fantastic fierce filthy fire-breathing flat floppy
    fluttering foolish frantic fresh friendly frightened
    frothy frustrating funny fuzzy gaudy gentle ghastly
    giddy gigantic glamorous gleaming glorious gorgeous
    graceful greasy grieving gritty grotesque grubby
    grumpy guilty handsome happy harebrained healthy
    helpful helpless high hollow homely horrific hostile
    huge hungry hurt icy ideal illogical immense
    impressionable intrigued irate irritable itchy
    jealous jittery jobless jolly joyous juicy jumpy
    kind kosher lackadaisical large lazy lethal light
    little lively livid lonely loose lovely lucky
    ludicrous macho magnificent mammoth maniacal
    massive melancholy melted miniature minute
    mistaken misty moody mortified motionless muddy
    mysterious narrow nasty naughty negative nervous
    nonchalant nonsensical nutritious nutty obedient
    oblivious obnoxious odd old-fashioned outrageous
    oval panicky peppy perfect perplexed petite petty
    plain pleasant poised pompous precious prickly
    proud pungent puny quaint queenly quizzical
    random ratty reassured relieved repulsive
    responsive ripe robust rotten rotund rough round
    safe salty sarcastic scant scary scattered scrawny
    selfish shaggy shaky shallow sharp shiny short silky
    silly skinny slimy slippery small smarmy smiling
    smoggy smooth smug soggy solid sore sour sparkling
    spicy splendid spotless square stale steady steep
    sticky stormy stout straight strange strong stunning
    substantial successful succulent superficial superior
    swanky sweet tart tasty teeny tender tense terrible
    testy thankful thick thoughtful thoughtless tight
    timely tricky trite troubled twitter pated uneven
    unsightly upbeat upset uptight valued vast vexed
    victorious virtuous vivacious vivid wacky waterproof
    weary whimsical whopping wicked witty wobbly wonderful
    worried young yummy zany zealous zippy
  |

  ColorPrefixes = [nil, "light", "dark"]

  Colors = %w|
    amber amethyst aqua crimson black blue golden
    maroon brown tan indigo purple magenta violet
    slate lavender rose beige snow-white silver
    navy-blue royal-blue sky-blue turquise cyan
    aqua sea-green chartreuse lime-green
    olive-green green grey jet-black navy-blue
    orange orange-red pink purple red silver
    teal white yellow
  |

  Animals = %w|
    aardvark alligator alpaca angelfish ant
    ant-eater antelope armadillo badger barnacle
    bat beaver blue-jay bobcat cardinal cheetah
    chicken chimpanzee chipmunk cobra cow coyote
    crane crow dodo dog dogfish dolphin donkey
    dove dragonfly duck eagle eel elk falcon
    ferret fox frog gecko gerbil giraffe goat
    goldfish goose gorilla groundhog guinea-pig
    guppy hawk herring hippo honey-badger
    hummingbird humpback-whale iguana
    jackrabbit jaguar kangaroo koala
    komodo-dragon kookaburra koy ladybug
    lemming lemur leopard lizard llama lynx
    magpie manatee manta-ray marlin mink
    minnow mockingbird mole moose
    mountain-goat mountain-lion mouse muskrat
    naked-mole-rat narwhal neon-tetra newt
    opossum osprey ostrich otter owl pack-rat
    panda-bear parrot peacock pelican pig
    pigeon piranha platypus polar-bear
    porcupine pug python quail rabbit raccoon
    rat raven reindeer rhino river-otter
    roadrunner rubber-duck salamander
    salmon scorpion sea-horse sea-lion
    sea-turtle shark sheep shrew skunk sloth
    snake spider squid squirrel stegosaurus
    swan swordfish tarantula tasmanian-devil
    tiger toad tortise toucan tree-frog
    triceratops trout tuna turkey turtle
    velociraptor viper vole vulture
    water-buffalo wolf wolverine
    woodpecker worm yak zebra
  |

  # Math according to: https://generatepasswords.org/how-to-calculate-entropy/
  Possibilities = Adjectives.size * Colors.size * Animals.size * ColorPrefixes.size

  # Entropy = log2(Number of Possible Combinations)
  Entropy = Math.log2(Possibilities)

  # Expected Number of guesses (to have a 50% chance of guessing the password) = 2^(Entropy-1)
  GuessCount = 2 ** (Entropy - 1.0)

  def self.choose
    adjective = Adjectives.shuffle(Random::Secure).first
    color_prefix = ColorPrefixes.shuffle(Random::Secure).first
    color = Colors.shuffle(Random::Secure).first
    animal = Animals.shuffle(Random::Secure).first
    number = Random::Secure.hex(1)

    {
      adjective: adjective,
      color_prefix: color_prefix,
      color: color,
      animal: animal,
      number: number,
      assembled: [adjective, color_prefix, color, animal, number].compact.join('-')
    }
  end
end
