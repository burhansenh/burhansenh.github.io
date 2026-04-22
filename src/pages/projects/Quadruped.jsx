export default function Quadruped() {
  return (
    <div className="container project-page">
      <h1>Quadruped Robot</h1>
      <p className="project-meta">Personal Project · 2026 · Planned</p>

      <p>
        A four-legged walking robot built from scratch — custom leg assemblies,
        bare-metal firmware for coordinated 12-servo actuation, and an
        IMU-based stabilization loop. The goal is a platform that walks
        reliably on flat surfaces using inverse kinematics for foot placement
        and configurable gait patterns (walk, trot, creep), all running on a
        single microcontroller with no external compute.
      </p>

      <h2>Technical Details</h2>
      <ul>
        <li>MCU: STM32F4 (ARM Cortex-M4, 168MHz, hardware FPU)</li>
        <li>Actuators: 12x MG996R digital servos (3 per leg — coxa, femur, tibia)</li>
        <li>Sensors: MPU-6050 6-axis IMU (I2C), current sense on servo rail</li>
        <li>Communication: UART telemetry, SPI between leg controllers (if distributed)</li>
        <li>Power: 2S LiPo with BEC regulation, voltage monitoring via ADC</li>
        <li>Language: C (bare-metal, CMSIS HAL)</li>
        <li>Build system: CMake + arm-none-eabi-gcc, OpenOCD for flashing/debug</li>
      </ul>

      <h2>Build Log</h2>
      <div className="project-log">
        <div className="log-entry">
          <h3>Design Phase — Architecture Planning</h3>
          <p className="log-date">2026</p>
          <p>
            The firmware architecture follows the same state-first pattern used
            in the jet engine controller: a top-level FSM
            manages <code>INIT</code>, <code>CALIBRATE</code>, <code>STAND</code>,
            <code>WALK</code>, <code>HALT</code>, and <code>FAULT</code> states.
            Each state defines which subsystems are active and what sensor
            conditions must hold.
          </p>
          <p>
            The control loop runs at 50Hz on a timer interrupt. Each cycle
            reads IMU data over I2C, computes body attitude corrections using a
            complementary filter, runs the gait sequencer to determine target
            foot positions, solves inverse kinematics per leg (3-DOF geometric
            IK — closed-form, no iterative solver needed), and writes servo
            commands over the PWM peripheral. The IK solver uses the STM32F4's
            hardware FPU for the trig operations, keeping the full loop under
            2ms.
          </p>
          <ul>
            <li><strong>Gait generator</strong> — phase-offset sinusoidal trajectories for each leg, with configurable stride length, height, and frequency</li>
            <li><strong>IK solver</strong> — geometric 3-DOF per leg (coxa yaw, femur pitch, tibia pitch), computes joint angles from Cartesian foot targets</li>
            <li><strong>IMU fusion</strong> — complementary filter blending accelerometer gravity vector with gyro integration for roll/pitch estimation</li>
            <li><strong>Servo driver</strong> — 12-channel PWM generation using timer output compare, with configurable pulse range per servo for mechanical trim</li>
          </ul>
        </div>
      </div>

      <h2>Gallery</h2>
      <div className="project-gallery">
        <div className="gallery-grid">
          <div className="placeholder-block">Photos and videos coming as build progresses</div>
        </div>
      </div>
    </div>
  )
}
