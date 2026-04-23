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
          working with motor drivers, brake actuation logic, and coordination
          with the gantry motion controller. The firmware runs under RTOS with
          communication over CAN bus for real time motor commands and TCP/IP for
          configuration and diagnostics from the host workstation.
        </p>
        <p className="entry-desc">
          I automated testing scripts using C# and worked on internal tooling
          including our host emulator tool, where I incorporated automated
          backup and restore functionality. I owned defect resolution across the
          motion control stack, tracing issues from application layer commands
          down through the motor driver interface. I also wrote and executed
          integration tests and validation suites for various defects and
          engineering change orders (ECOs) on bench hardware before changes went
          out to hospital installations.
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
          (CAVES) lab, working alongside a PhD student on embedded motor control
          for electric vehicle drivetrains. I assisted in configuring embedded
          motor control software using the TI F280025C C2000 real time
          microcontroller and completed TI C2000 labs on ADC, ePWM, DMA, and
          SCI/UART based communication interfaces.
        </p>
        <p className="entry-desc">
          I contributed to validation of three phase inverter and EV motor
          control behavior in software before hardware testing by configuring
          peripherals and examining PWM and ADC signals for real time embedded
          debugging on the bench using an oscilloscope.
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
          Defined the networking requirements for DAIODE, a solar powered edge
          AI data center built inside a shipping container. I designed the
          network topology using a leaf spine architecture with Cisco Nexus 9300
          switches, spec'd the compute nodes (Dell PowerEdge R760 servers with
          NVIDIA A100 GPUs), and worked through the full infrastructure stack
          from power distribution and cooling to Fortinet firewall placement and
          WAN uplink through a Catalyst 8300 router. I also organized meetings
          with vendors to discuss project fit and evaluate hardware options.
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
