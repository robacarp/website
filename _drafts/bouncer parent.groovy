

definition(
    name: "Big Bouncer",
    namespace: "rob",
    author: "rob",
    description: "Combine multiple notificatibales into one",
    category: "Safety & Security",
	iconUrl: "",
    iconX2Url: "",
    iconX3Url: "")


preferences {
     page name: "mainPage", title: "", install: true, uninstall: true
}


def installed() {
    log.debug "Installed with settings: ${settings}"
    initialize()
}


def updated() {
    log.debug "Updated with settings: ${settings}"
    unsubscribe()
    initialize()
}


def initialize() {
    log.info "There are ${childApps.size()} child apps"
    childApps.each { child ->
    	log.info "Child app: ${child.label}"
    }
}

def mainPage() {
    dynamicPage(name: "mainPage") {
	state.appInstalled = app.getInstallationState()
	
	if (state.appInstalled != 'COMPLETE') {
		section{paragraph "Please hit 'Done' to install '${app.label}' parent app "}
  	}
  	else {
         	section("<H1>${app.label}</H1>") {
				paragraph "Notify a group of objects based on presence and mode"
			}
  			section("") {
				app(name: "anyOpenApp", appName: "Bouncer", namespace: "rob", title: "<b>Add/Edit Bouncer</b>", multiple: true)
			}
			section("") {
       			label title: "Enter a name for parent app (optional)", required: false
 			}
		}
	}
}