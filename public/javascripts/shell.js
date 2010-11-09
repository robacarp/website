//An exercise in programming with global variables <.<
//Commands can be entered, etc, and there is a mostly functional command history.
//
//  Problems:
//    - Entering commands past the length of the window doesn't autoscroll.
//    - Obscure and crappy handling of shift-chars.
//    - $('shell').focus puts the cursor at the wrong spot.

var command_length = 0;
var command_history = new Array('');
var history_pointer = 0;
var prompt = '$ ';

var commands = { 'prompt': setprompt, 'print': print, 'help': help, 'exit': exit, 'clear': clear, 'echo': echo};
function setprompt(command){ prompt = command[1];}
function print(command){
  command.shift()
  alert(command.join(' '))
  return 'done'
}
var help_ct = 0;
function help(command){
  add_on = ''
  if (command.length>1 && help_ct > 0)
    add_on += '\nI *said* no more help exists.'
  if (help_ct > 3)
    add_on += ' Stop Torturing Me For Information.'

  help_ct ++;

  return 'Available commands are \n'+
    '\thelp   - Display this message.\n'+
    '\tprompt - Set the display prompt.\n'+
    '\tprint  - Print text to the screen.\n'+
    '\techo   - Echo text right back.\n'+
    '\tclear  - Clears the screen, and a few other things.\n'+
    '\texit   - Why are you reading this?\n'+
    '\nBut the world is at your fingertips, re-program me with the \'commands\' array:\n'+
    '\tvar commands = { \'text\': function }\n'+
    '\nNo further help exists.'+add_on
}
function exit(command){
  setTimeout("$('shell').hide()",300);
  return "Goodbye."
}
function clear(command){
  if (command.length==1)
    command[1]='';
  switch (command[1]){
    case 'conscience': return 'Go. Be Free. Set your mind at ease.'; break;
    case 'history': command_history = new Array(); history_pointer = 0; return 'The past is history.'; break;
    case 'acne': return 'I\'m not entirely sure I want to help with that. Sorry.'; break;
    default: $('shell').value = 'Cleared. :-)'; return; break;
  }
}
function echo(command){ command.shift(); return command.join(' ');}


document.observe('dom:loaded',preload_shell);

function preload_shell(){
  //add code to watch for some key sequence or something
  //$('footer').innerHTML = '<a href="#" id="launcher">LAUNCH!</a>' + $('footer').innerHTML
  $('pi')
    .observe('dblclick',function(evt){ load_shell(); Event.stop(evt); return false;})
    .observe('click',function(evt){ Event.stop(evt); });
}

function load_shell(){
  Effect.ScrollTo('wrap',{ duration: 0.3});
  var shell = new Element('textarea', {id: 'shell'}).setStyle({
      backgroundColor:'#000',
      color:'#fff',
      width:'95%',
      margin:'1em',
      height:'30em',
      border:'0 solid black',
      position:'fixed',
      top:0,
      left:0,
      fontSize:'1.3em',
      fontFamily:'monospace'
    });
  document.body.insert({ top: shell });
  shell.value = "Booting shell....done\n";
  shell.value += prompt;
  shell.observe('keydown',shell_input);
  shell.focus();
}

function shell_input(evt){
  key = evt.keyCode;
  if (key == 38 || key == 40){ //arrow keys
    //console.log('arrow key');
    if (key == 38 && history_pointer < command_history.length-1){ //up
      swap_history_command(history_pointer, history_pointer +1);
      history_pointer ++;
    }
    if (key == 40 && history_pointer > 0){ //down
      swap_history_command(history_pointer, history_pointer -1);
      history_pointer --;
    }

    Event.stop(evt);
    return;
  }

  if (key == 13) {//enter
    //console.log('enter');
    command_length = 0;
    if (history_pointer != 0)
      command_history.unshift( command_history[history_pointer] );

    command_history.unshift('')
    history_pointer = 0;
    Event.stop(evt);
    execute(command_history[1]);
    $('shell').value += "\n"+prompt;
    return;
  }

  if (key == 8){ //backspace?
    //console.log('backspace')
    if (command_length < 1)
      Event.stop(evt);
    else {
      command_length --;
      command_history[0] = command_history[0].substring(0,command_history[0].length -1);  //really...
    }
    return;
  }

  if (key >= 32 && key <= 126){
    if (!evt.shiftKey && key!=32) key += 32;  //might there be a better way to do this?...I hope so, cause this is b0rked
    command_history[history_pointer] += String.fromCharCode(key);
    //console.log(command_history);
    command_length++;
    return;
  }

  //if it is outside the alphanumeric range, just disallow it... *i18n eek*
  // also protects against left/right arrow key insanity
  //console.log(evt);
  Event.stop(evt);
}

function swap_history_command(current, destination){
  $('shell').value = $('shell').value.substring(0,$('shell').value.length - command_history[current].length);
  $('shell').value+= command_history[destination];
  command_length = command_history[destination].length;
}

function execute(input){
  if (input.indexOf(' ')>0)
    command = input.substring(0,input.indexOf(' '));
  else
    command = input;

  switch (typeof commands[command]){
    case 'function':
      retval = commands[command].call(command, input.split(' '));
    break;
    case 'undefined':
      $('shell').value += "\n No command handler found. `" + input + "`";
      if (Math.round(Math.random()*4+1) == 3)
        $('shell').value += "\n Don't break me. *wimper* "
    break;
    default:
      alert('What have you done now? I don\'t know what to do with that! Help me help you. >:-|');
  }

  if (typeof retval == 'string'){
    $('shell').value+='\n'+retval;
  }
}





