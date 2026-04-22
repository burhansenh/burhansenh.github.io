export default function Experience() {
  return (
    <div className="container page">
      <h1>Experience</h1>

      <section className="entry">
        <h2>Embedded Software Engineering Co-Op</h2>
        <p className="entry-org">Siemens Healthineers</p>
        <p className="entry-dates">January – May 2026</p>
        <figure className="entry-photo">
          <img src="/images/siemens/symbia-prospecta.jpg" alt="Symbia Pro.specta SPECT/CT scanner" />
          <figcaption>Symbia Pro.specta SPECT/CT scanner (Siemens Healthineers)</figcaption>
        </figure>
        <p className="entry-desc">
          I worked on embedded firmware across the entire SPECT/CT scanner
          product line, including new products that have not yet been publicly
          disclosed. My primary focus was the long linear drive (LLD) subsystem,
          which positions the detector heads along the gantry rail. I wrote and
          refactored C/C++ motor control firmware for the LLD linear brakes,
          working with stepper and servo motor drivers, encoder feedback for
          position tracking, and brake actuation logic that coordinates with the
          gantry motion controller. The firmware runs under RTOS with
          communication over CAN bus for real time motor commands and TCP/IP for
          configuration and diagnostics from the host workstation.
        </p>
        <p className="entry-desc">
          I owned defect resolution across the motion control stack, tracing
          issues from application layer commands down through the motor driver
          interface. I also spent significant time on testing: writing and
          executing integration tests, regression suites, and subsystem
          integration tests on bench hardware to validate firmware changes
          before they went out to hospital installations.
        </p>
      </section>

      <section className="entry">
        <h2>Undergraduate Research Assistant</h2>
        <p className="entry-org">CAVES Lab, University of Akron</p>
        <p className="entry-dates">November 2025 – Present</p>
        <div className="image-grid entry-photos">
          <figure>
            <img src="/images/caves-lab/IMG_0550.jpeg" alt="EV motor and three phase inverter assembly on the lab bench" />
            <figcaption>EV motor and three phase inverter assembly</figcaption>
          </figure>
          <figure>
            <img src="/images/caves-lab/IMG_0565.jpeg" alt="Motor test bench with oscilloscope and TI C2000 dev board" />
            <figcaption>Test bench with oscilloscope and C2000 controller</figcaption>
          </figure>
        </div>
        <p className="entry-desc">
          Research in the Center for Automotive Vehicle Electronics and Security
          (CAVES) lab on embedded motor control for electric vehicle drivetrains.
          I write bare metal firmware on the TI F280025C C2000 microcontroller to
          drive a three phase inverter. The work involves configuring peripherals
          at the register level: ADC modules for phase current sensing with
          synchronized sampling, ePWM for complementary gate drive signals with
          dead time insertion, DMA for moving ADC results without CPU
          intervention, and SCI/UART for serial communication with the host PC.
        </p>
        <p className="entry-desc">
          I validate inverter switching behavior and motor control algorithms on
          the bench using an oscilloscope to verify PWM timing, current
          waveforms, and gate drive signals before anything runs on an actual EV
          powertrain.
        </p>
      </section>

      <section className="entry">
        <h2>Data Center Systems Engineering Intern</h2>
        <p className="entry-org">Lumena Energy</p>
        <p className="entry-dates">May – August 2025</p>
        <figure className="entry-photo">
          <img src="/images/lumena-energy/Screenshot from 2026-04-22 16-39-51.png" alt="Containerized edge data center layout" />
          <figcaption>Containerized edge data center concept</figcaption>
        </figure>
        <p className="entry-desc">
          Defined the firmware and networking requirements for DAIODE, a solar
          powered edge AI data center built inside a shipping container. I
          designed the network topology using a leaf spine architecture with
          Cisco Nexus 9300 switches, spec'd the compute nodes (Dell PowerEdge
          R760 servers with NVIDIA A100 GPUs), and worked through the full
          infrastructure stack from power distribution and cooling to Fortinet
          firewall placement and WAN uplink through a Catalyst 8300 router.
        </p>
      </section>

      <section className="entry">
        <h2>Robotics Camp Teaching Assistant</h2>
        <p className="entry-org">Illinois Tech Summer Camp</p>
        <p className="entry-dates">June – July 2025</p>
        <p className="entry-desc">
          Taught 20+ students how to build and program robots using Elegoo smart
          car kits. The students built line follower and maze solver robots,
          learning PWM motor control, digital I/O, and infrared sensor
          calibration along the way. I debugged student projects hands on,
          working through motor driver wiring issues, sensor tuning, and C/C++
          code in the Arduino IDE.
        </p>
      </section>
    </div>
  )
}
