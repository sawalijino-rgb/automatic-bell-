// =====================================================
// ESP32 CONNECTION
// =====================================================

// PALITAN ITO NG IP ADDRESS NG ESP32
const ESP32_IP = "192.168.1.100";


// =====================================================
// SEND COMMAND TO ESP32
// =====================================================

function sendCommand(command) {

    fetch(`http://${ESP32_IP}/${command}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("ESP32 error");
            }

            return response.text();

        })

        .then(() => {

            updateStatus();

        })

        .catch(error => {

            console.log("ESP32 connection error:", error);

            showDisconnected();

        });

}


// =====================================================
// NORMAL BELL
// =====================================================

function ringBell() {

    sendCommand("bell");

}


// =====================================================
// STOP BELL
// =====================================================

function stopBell() {

    sendCommand("stop");

}


// =====================================================
// EARTHQUAKE
// =====================================================

function earthquakeAlarm() {

    const answer =
        confirm("Start EARTHQUAKE ALARM?");

    if (answer) {

        sendCommand("earthquake");

    }

}


// =====================================================
// FIRE
// =====================================================

function fireAlarm() {

    const answer =
        confirm("Start FIRE ALARM?");

    if (answer) {

        sendCommand("fire");

    }

}


// =====================================================
// STOP ALARM
// =====================================================

function stopAlarm() {

    sendCommand("stopalarm");

}


// =====================================================
// DISCONNECTED
// =====================================================

function showDisconnected() {

    const status =
        document.getElementById(
            "connectionStatus"
        );

    status.innerText =
        "ESP32 Disconnected";

    status.className =
        "status disconnected";

}


// =====================================================
// UPDATE STATUS
// =====================================================

function updateStatus() {

    fetch(`http://${ESP32_IP}/status`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "ESP32 unavailable"
                );

            }

            return response.json();

        })

        .then(data => {

            const status =
                document.getElementById(
                    "connectionStatus"
                );

            status.innerText =
                data.status;

            status.className =
                "status connected";


            document.getElementById(
                "currentSubject"
            ).innerText =
                data.subject;


            document.getElementById(
                "timer"
            ).innerText =
                data.remaining;


            updateSubjects(
                data.current
            );

        })

        .catch(error => {

            console.log(error);

            showDisconnected();

        });

}


// =====================================================
// SUBJECT LIST
// =====================================================

function updateSubjects(current) {

    const subjects =
        document.querySelectorAll(
            ".subject-item"
        );

    subjects.forEach(
        (item, index) => {

            if (index === current) {

                item.classList.add(
                    "active"
                );

            } else {

                item.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =====================================================
// AUTO UPDATE EVERY SECOND
// =====================================================

setInterval(
    updateStatus,
    1000
);


// Initial update
updateStatus();
