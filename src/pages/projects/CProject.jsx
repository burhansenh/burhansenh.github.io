export default function CProject() {
  return (
    <div className="container project-page">
      <h1>Embedded C Peripheral Driver Library</h1>
      <p className="project-meta">Personal Project · 2026 · Planned</p>

      <p>
        A register-level peripheral driver library for STM32 microcontrollers,
        written entirely in C without HAL abstraction. The project targets the
        STM32F4 family and implements drivers for UART, SPI, I2C, ADC, DMA,
        and timer peripherals — each written directly against the reference
        manual, with no dependencies on vendor-generated code. The goal is a
        portable, minimal driver layer that can be dropped into any bare-metal
        project.
      </p>

      <h2>Technical Details</h2>
      <ul>
        <li>Language: C11 (bare-metal, -ffreestanding)</li>
        <li>Platform: STM32F407VGT6 (ARM Cortex-M4, 168MHz)</li>
        <li>Peripherals: UART (DMA-backed TX/RX ring buffers), SPI (polling + DMA modes), I2C (master, 7-bit addressing), ADC (single/scan/continuous with DMA), timers (PWM, input capture, periodic interrupts)</li>
        <li>Build system: CMake + arm-none-eabi-gcc</li>
        <li>Debug: OpenOCD + GDB, Saleae logic analyzer for protocol validation</li>
        <li>Testing: Loopback tests (UART TX→RX, SPI MOSI→MISO), oscilloscope timing verification</li>
      </ul>

      <h2>Build Log</h2>
      <div className="project-log">
        <div className="log-entry">
          <h3>Architecture Planning</h3>
          <p className="log-date">2026</p>
          <p>
            Each peripheral driver follows a consistent pattern: an init
            function that configures clock gating, pin alternate functions, and
            peripheral registers; a set of blocking and non-blocking transfer
            functions; and an IRQ handler that manages DMA completion or
            byte-level interrupts. All drivers expose a clean C API with no
            global state — peripheral handles are passed explicitly, so
            multiple instances of the same peripheral type can coexist.
          </p>
          <p>
            The UART driver is the most complete: it uses DMA for both TX and
            RX with circular ring buffers, supports configurable baud rate
            (computed from APB clock dividers), and handles overrun/framing
            errors by incrementing a diagnostic counter rather than silently
            dropping data. The SPI driver supports both polling mode for
            low-throughput configuration reads and DMA mode for bulk sensor
            data transfers.
          </p>
          <ul>
            <li><strong>UART</strong> — DMA ring buffer TX/RX, idle-line detection for variable-length frames, error counting</li>
            <li><strong>SPI</strong> — configurable CPOL/CPHA, CS management (hardware NSS or GPIO), DMA scatter-gather for chained transfers</li>
            <li><strong>I2C</strong> — master mode with clock stretching support, repeated start for register reads, bus recovery (clock toggle on SDA stuck low)</li>
            <li><strong>ADC</strong> — single-shot and continuous scan with DMA, configurable sample time per channel, temperature sensor and Vrefint calibration</li>
            <li><strong>Timers</strong> — PWM output (center/edge aligned), input capture for frequency measurement, one-pulse mode for precise timing</li>
          </ul>
        </div>
      </div>

      <h2>Gallery</h2>
      <div className="project-gallery">
        <div className="gallery-grid">
          <div className="placeholder-block">Logic analyzer captures and oscilloscope traces coming soon</div>
        </div>
      </div>
    </div>
  )
}
