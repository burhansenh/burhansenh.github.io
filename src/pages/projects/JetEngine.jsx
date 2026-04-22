export default function JetEngine() {
  return (
    <div className="container-wide project-page">
      <h1>Jet Engine Controller</h1>
      <p className="project-meta">Personal Project · 2026 · Prototype Phase</p>

      <p className="project-intro">
        Building a custom electronic control unit (ECU) for a SimJet 1200
        miniature turbojet engine mounted on an RC car. The ECU uses a finite
        state machine in C on an ESP32 to manage the full engine lifecycle from
        glow plug ignition through spool up to steady state thrust. Currently in
        prototype phase — the controller is validated on breadboard hardware but
        does not yet reliably start the engine. To get the engine running, I
        bypassed the ECU entirely and used direct propane injection and direct
        power to the starter motor.
      </p>

      <h2>Engine Running</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>SimJet 1200 Combustion Test</h3>
          <p>
            The SimJet 1200 produces around 5 kg of thrust and runs on kerosene
            with propane assist for ignition. This test was done by bypassing the
            ECU completely — propane fed directly into the combustion chamber and
            power applied straight to the starter motor to spool the turbine.
            Once the exhaust gas temperature climbed past the ignition threshold,
            kerosene was introduced manually through the fuel pump.
          </p>
          <p>
            The lights-off footage shows the exhaust flame and turbine glow
            during a sustained run. Getting to this point required iterating on
            fuel flow rates and starter timing by hand, which is exactly what the
            ECU is meant to automate once the controller firmware is working.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <video controls width="100%" playsInline>
              <source src="/images/jet-engine/IMG_0226.mp4" type="video/mp4" />
            </video>
            <figcaption>SimJet 1200 running with lights off — direct propane and power bypass</figcaption>
          </figure>
        </div>
      </div>

      <h2>Engine Hardware</h2>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Turbojet on the RC Platform</h3>
          <p>
            The SimJet 1200 is mounted to a 1/8 scale RC car chassis. The car's
            RC receiver provides throttle and arming signals over PPM, which the
            ECU parses and maps to fuel pump duty cycle through a configurable
            throttle curve. During bench testing the engine runs off a bench
            supply (visible in photos at ~39V) while the ECU and actuators run
            off a separate regulated rail.
          </p>
          <p>
            The fuel system uses a PWM-driven pump feeding kerosene through a
            metering valve into the combustion chamber. A glow plug preheats the
            combustion zone before fuel is introduced, and a brushless starter
            motor spools the compressor to the minimum RPM needed for self
            sustaining operation.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0187 (1).jpeg" alt="RC car with turbojet engine mounted, full wiring harness visible" />
            <figcaption>RC car chassis with the SimJet 1200 and wiring harness</figcaption>
          </figure>
        </div>
      </div>

      <figure className="project-hero" style={{ marginTop: '1rem' }}>
        <img src="/images/jet-engine/IMG_0287.JPG" alt="SimJet 1200 turbojet engine closeup" />
        <figcaption>SimJet 1200 engine assembly</figcaption>
      </figure>

      <h2>ECU Prototyping</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Breadboard to Controller</h3>
          <p>
            The ECU prototype is built on breadboards with an ESP32 running the
            state machine firmware. A 16x2 LCD shows the current FSM state,
            sensor readings, and fault codes in real time. Relay modules switch
            the glow plug and starter motor, and a buck converter steps down the
            main battery to power the logic side.
          </p>
          <p>
            The display cycles through state info
            like <code>IDLE</code>, <code>PREHEAT</code>, <code>RUNNING</code>,
            and <code>TEST MODE</code>. During prototyping this was the primary
            debugging tool since there is no JTAG on the ESP32 and serial output
            is occupied by the telemetry stream. The breadboard ECU can drive all
            the actuators correctly in isolation — the challenge is getting the
            full ignition sequence to work reliably end to end.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0285 (1).jpeg" alt="ECU breadboard prototype showing LCD with FSM state and relay modules" />
            <figcaption>ECU prototype with LCD displaying FSM state</figcaption>
          </figure>
        </div>
      </div>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Wiring and Power</h3>
          <p>
            The breadboard layout includes relay modules for switching the glow
            plug and starter motor, a buck converter for logic power, and
            connectors for the thermocouple and RPM sensor. The wiring runs back
            to the engine on the RC car chassis for bench testing with real
            actuators and sensors.
          </p>
          <p>
            The bench power supply provides ~39V to the starter motor and fuel
            pump during ignition sequences. Keeping the high power and logic
            rails separate prevents noise from the starter motor from corrupting
            sensor readings on the ESP32's ADC.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0282 (1).jpeg" alt="Breadboard wiring with LCD, relay modules, and buck converter" />
            <figcaption>Breadboard layout with relay modules and power regulation</figcaption>
          </figure>
        </div>
      </div>

      <h2>Firmware Architecture</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Finite State Machine</h3>
          <p>
            The firmware is organized around a finite state machine with
            states: <code>IDLE</code>, <code>GLOW_PREHEAT</code>,{' '}
            <code>STARTER_SPOOL</code>, <code>IGNITION</code>,{' '}
            <code>RAMP_UP</code>, <code>RUNNING</code>, <code>COOLDOWN</code>,
            and <code>FAULT</code>. Every actuator command is gated by the
            current state — the fuel pump can only be enabled
            during <code>IGNITION</code>, <code>RAMP_UP</code>,
            or <code>RUNNING</code>. Any fuel command outside those states gets
            rejected at the FSM level regardless of what the control loop
            requests.
          </p>
          <p>
            Transitions depend on sensor readings. The FSM will not advance
            from <code>IGNITION</code> to <code>RAMP_UP</code> until the exhaust
            gas temperature (EGT) thermocouple confirms combustion. If ignition
            is not detected within the timeout, the sequence aborts: fuel off,
            starter continues briefly to purge unburnt fuel, then full shutdown.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0246.PNG" alt="Bench testing with power supply and engine running" />
            <figcaption>Bench testing setup with power supply at ~39V</figcaption>
          </figure>
        </div>
      </div>

      <h2>Safety and Sensors</h2>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Safety Interlocks</h3>
          <p>
            A separate safety layer runs on every control loop iteration before
            any actuator outputs are committed. It checks EGT and RPM against
            hard limits and rate-of-change thresholds. If EGT exceeds the
            redline or RPM spikes faster than the expected spool rate, the system
            forces an immediate transition to <code>FAULT</code>, cutting fuel,
            killing the starter, and logging the failure.
          </p>
          <p>
            The K-type thermocouple uses cold junction compensation and a moving
            average filter to reject noise without masking real temperature
            events. RPM comes from a hall effect sensor using input capture with
            edge timing. Both channels implement timeout detection — if a sensor
            disconnects, the safety layer treats it as a fault rather than
            operating on stale data.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <video controls width="100%" playsInline>
              <source src="/images/jet-engine/IMG_0222.mp4" type="video/mp4" />
            </video>
            <figcaption>Starter motor spool up test</figcaption>
          </figure>
        </div>
      </div>

      <h2>Combustion Tests</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Night Runs</h3>
          <p>
            These photos show the engine during combustion testing with direct
            propane and power. The glow plug ignites the fuel-air mixture and the
            exhaust glows as the turbine spools up. At this stage the engine runs
            on manual control while the ECU logs EGT, RPM, and fuel pump duty
            cycle over serial telemetry at 10Hz.
          </p>
          <p>
            The exhaust glow and flame visibility are useful diagnostics — the
            color and intensity indicate whether the fuel-air mixture is lean or
            rich and whether combustion is stable. A clean blue flame means good
            combustion; orange or flickering means the mixture needs adjustment.
          </p>
        </div>
        <div className="section-media">
          <div className="media-stack">
            <figure>
              <img src="/images/jet-engine/IMG_0243.PNG" alt="Jet engine running at night with exhaust flame visible" />
              <figcaption>Combustion test with exhaust flame visible</figcaption>
            </figure>
            <figure>
              <img src="/images/jet-engine/IMG_0244.PNG" alt="Exhaust glowing red during sustained run" />
              <figcaption>Exhaust glow during sustained operation</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <h2>Challenges and Next Steps</h2>

      <div className="section-full">
        <p>
          The main challenge is getting the ECU to reliably execute the full
          ignition sequence autonomously. The controller can drive each actuator
          individually, but the timing between glow plug preheat, starter spool,
          and fuel introduction is sensitive — too early on fuel and you get a
          flameout, too late and the glow plug cools below ignition temperature.
          The K-type thermocouple readings also get noisy from electromagnetic
          interference near the starter motor, which makes the ignition detection
          window hard to tune.
        </p>
        <p>
          Next steps are debugging the ignition sequence timing, moving from
          breadboard to a proper PCB, and integrating the thermocouple and RPM
          sensor into the engine housing. The end goal is a fully autonomous
          start sequence where arming the RC transmitter triggers the ECU through
          the complete startup, and throttle commands map directly to thrust.
        </p>
      </div>
    </div>
  )
}
