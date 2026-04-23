export default function JetEngine() {
  return (
    <div className="container-wide project-page">
      <h1>Jet Engine Controller</h1>
      <p className="project-meta">Personal Project · 2026 · Prototype Phase</p>

      <p className="project-intro">
        Building a custom electronic control unit (ECU) for a SimJet 1200
        miniature turbojet engine mounted on an RC car. The SimJet 1200
        produces 12 lbs of max thrust, runs on Jet A1/kerosene with
        propane/butane for ignition assist, and normally ships with a FADEC
        (Full Authority Digital Engine Control) unit. The goal of this project
        is to design and build a replacement ECU from scratch using an Arduino
        Nano and C++, implementing the full startup sequence as a finite state
        machine. Currently in prototype phase: the ECU has gotten the engine
        spooling up on the starter motor, but we have not achieved ignition
        through the controller yet.
      </p>

      <h2>Engine Spool Up</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>SimJet 1200 Test Run</h3>
          <p>
            This test was done by bypassing the ECU completely: propane fed
            directly into the combustion chamber and power applied straight to
            the starter motor to spool the turbine. Once the exhaust gas
            temperature climbed past the ignition threshold, kerosene was
            introduced manually through the fuel pump. The video shows the
            exhaust flame and turbine glow during a sustained run with direct
            propane and power.
          </p>
          <p>
            Getting to this point required iterating on fuel flow rates and
            starter timing by hand, which is exactly what the ECU is meant to
            automate once the controller firmware can reliably sequence the
            ignition.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <video controls width="100%" playsInline>
              <source src="/images/jet-engine/IMG_0226.mp4" type="video/mp4" />
            </video>
            <figcaption>SimJet 1200 running with direct propane and power bypass</figcaption>
          </figure>
        </div>
      </div>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Starter Spool Verification</h3>
          <p>
            This clip verifies the starter motor spools the turbine up as
            expected. The ECU commands the starter at the configured power
            level and we confirm the compressor reaches the target RPM. This
            is a key validation step before attempting the full ignition
            sequence.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <video controls width="100%" playsInline>
              <source src="/images/jet-engine/jet-engine-ignition.mp4" type="video/mp4" />
            </video>
            <figcaption>Verifying starter motor spools the turbine correctly</figcaption>
          </figure>
        </div>
      </div>

      <h2>Engine Hardware</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Turbojet on the RC Platform</h3>
          <p>
            The SimJet 1200 is mounted to a 1/8 scale RC car chassis. The car's
            RC receiver provides throttle and arming signals over PPM, which the
            ECU parses and maps to fuel pump duty cycle through a configurable
            throttle curve. We also set up the receiver to control the ignition
            sequence during validation, allowing us to trigger each FSM state
            transition from the transmitter.
          </p>
          <p>
            The car's steering servos currently do not work because the
            batteries have been dead from sitting. During bench testing the
            engine runs off a bench supply (visible in photos at ~39V) while the
            ECU and actuators run off a separate regulated rail.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0187 (1).jpeg" alt="RC car with turbojet engine mounted, full wiring harness visible" />
            <figcaption>RC car chassis with the SimJet 1200 and wiring harness</figcaption>
          </figure>
        </div>
      </div>

      <figure className="project-hero project-hero-contain" style={{ marginTop: '1rem' }}>
        <img src="/images/jet-engine/IMG_0287.JPG" alt="SimJet 1200 turbojet engine closeup" />
        <figcaption>SimJet 1200 engine assembly: 10.25 inches long, 3.5 inch diameter, 2.2 lbs</figcaption>
      </figure>

      <h2>Ignition Sequence</h2>

      <div className="section-full">
        <h3>How the FADEC Starts the Engine</h3>
        <p>
          According to the SimJet FADEC manual, the stock ECU uses PWM with
          1024 discrete levels to control the fuel pump, glow plug, and starter
          motor. The ignition sequence
          is: <code>Ready</code> → <code>Glow Test</code> → <code>StartOn</code> → <code>Ignition</code> → <code>Preheat</code> → <code>FuelRamp</code> → <code>Running</code>.
          The throttle signal from the receiver triggers the sequence. First,
          the starter motor engages at reduced power (configurable via
          the <code>POWERSTA</code> parameter, 0 to 255) while the glow plug
          heats and the propane solenoid valve opens. The FADEC then monitors
          EGT through a K type thermocouple, waiting for the temperature to
          rise above the programmed start/minimum threshold, confirming that
          combustion has occurred.
        </p>
        <p>
          Once ignition is detected, the FADEC enters a preheat phase
          (configurable delay, default ~6 seconds) to let the combustion
          chamber stabilize, then begins the fuel ramp. During the fuel ramp
          the kerosene pump power increases gradually across three RPM
          transition points (<code>RPM1TRA</code>, <code>RPM2TRA</code>, with
          corresponding <code>RAMP1</code> through <code>RAMP3</code> values)
          while the propane valve closes at a target RPM
          (<code>T_STOP_G</code>). The starter disengages when the turbine
          reaches self sustaining speed (<code>R_STOP_S</code>), and the
          engine enters steady state running under closed loop throttle
          control.
        </p>
        <p>
          The custom ECU replicates this sequence as a finite state machine in
          C++ on the Arduino Nano. The states
          are: <code>IDLE</code>, <code>GLOW_PREHEAT</code>,{' '}
          <code>STARTER_SPOOL</code>, <code>IGNITION</code>,{' '}
          <code>RAMP_UP</code>, <code>RUNNING</code>, <code>COOLDOWN</code>,
          and <code>FAULT</code>. Every actuator command is gated by the
          current state. The fuel pump can only be enabled
          during <code>IGNITION</code>, <code>RAMP_UP</code>,
          or <code>RUNNING</code>. The challenge has been tuning the timing
          and power levels at each transition to match what the FADEC does
          internally with its calibrated parameters.
        </p>
      </div>

      <h2>ECU Prototyping</h2>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Breadboard ECU</h3>
          <p>
            The ECU prototype is built on breadboards with an Arduino Nano
            running the state machine firmware in C++. A 16x2 LCD shows the
            current FSM state, sensor readings, and fault codes in real time.
            Relay modules switch the glow plug and starter motor on and off, and
            a buck converter steps down the main battery voltage to power the
            logic side.
          </p>
          <p>
            The relay modules were chosen because the glow plug and starter
            motor draw too much current for the Arduino's digital pins to
            switch directly. The buck converter keeps the 5V logic rail clean
            and isolated from the high current motor rail. The LCD was the
            primary debugging tool during prototyping since serial output is
            occupied by the telemetry stream.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0285 (1).jpeg" alt="ECU breadboard prototype showing LCD with FSM state and relay modules" />
            <figcaption>ECU prototype showing FSM state on LCD</figcaption>
          </figure>
        </div>
      </div>

      <div className="section-row">
        <div className="section-text">
          <h3>Wiring and Power Layout</h3>
          <p>
            The breadboard layout separates high power and logic rails to
            prevent noise from the starter motor from corrupting sensor readings
            on the Arduino's ADC. The bench power supply provides ~39V to the
            starter motor and fuel pump during ignition sequences. A K type
            thermocouple with a MAX6675 amplifier reads the exhaust gas
            temperature, and a hall effect sensor provides RPM feedback from the
            turbine shaft.
          </p>
          <p>
            Each component was chosen to handle a specific part of the ignition
            sequence: relays for high current switching, the thermocouple for
            confirming combustion, and the RPM sensor for verifying the turbine
            has reached self sustaining speed before the starter motor
            disengages.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/jet-engine/IMG_0282 (1).jpeg" alt="Breadboard wiring with LCD, relay modules, and buck converter" />
            <figcaption>Breadboard layout with relay modules, buck converter, and sensor connectors</figcaption>
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
            hard limits and rate of change thresholds. If EGT exceeds the
            redline (the SimJet 1200 has an emergency shutdown temperature of
            800°C) or RPM spikes faster than the expected spool rate, the
            system forces an immediate transition to <code>FAULT</code>,
            cutting fuel, killing the starter, and logging the failure.
          </p>
          <p>
            The K type thermocouple reads up to 1000°C through the MAX6675
            amplifier with cold junction compensation. RPM comes from a hall
            effect sensor using input capture with edge timing. Both channels
            implement timeout detection so if a sensor disconnects, the safety
            layer treats it as a fault rather than operating on stale data.
            This mirrors the stock FADEC's Auto Shut Down (ASD) system, which
            cuts fuel on overspeed, overtemp, or loss of throttle signal.
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

      <h2>Bench Testing</h2>

      <div className="image-grid">
        <figure>
          <img src="/images/jet-engine/IMG_0243.PNG" alt="Jet engine with exhaust flame visible during testing" />
          <figcaption>Exhaust flame visible during combustion test</figcaption>
        </figure>
        <figure>
          <img src="/images/jet-engine/IMG_0244.PNG" alt="Exhaust glowing during sustained run" />
          <figcaption>Exhaust glow during sustained operation</figcaption>
        </figure>
      </div>

      <h2>Challenges and Next Steps</h2>

      <div className="section-full">
        <p>
          The main challenge is getting the ECU to reliably execute the full
          ignition sequence autonomously. The controller can spool the starter
          motor and energize the glow plug, but the timing between preheat,
          starter spool, and fuel introduction is sensitive. Too early on fuel
          and you get a flameout, too late and the glow plug cools below
          ignition temperature. The K type thermocouple readings also get noisy
          from electromagnetic interference near the starter motor, which makes
          the ignition detection window hard to tune.
        </p>
        <p>
          Next steps are calibrating the FADEC parameters
          (<code>POWERSTA</code>, <code>RAMP1</code> through <code>RAMP3</code>,
          preheat delay) to match the custom ECU's timing, moving from
          breadboard to a proper PCB, and integrating the thermocouple and RPM
          sensor into the engine housing. The end goal is a fully autonomous
          start sequence where arming the RC transmitter triggers the ECU
          through the complete startup, and throttle commands map directly to
          thrust.
        </p>
      </div>
    </div>
  )
}
