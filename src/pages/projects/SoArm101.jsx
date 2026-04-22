export default function SoArm101() {
  return (
    <div className="container-wide project-page">
      <h1>SO-ARM101 Robotic Manipulator</h1>
      <p className="project-meta">Personal Research Project · 2025–2026 · Active</p>

      <p className="project-intro">
        Imitation learning on a $300 6-DOF robot arm. Trained an ACT policy to
        autonomously pick and place objects at a 70% success rate from 50 human
        demonstrations. Next goal is training a reinforcement learning agent to
        play chess and fold shirts.
      </p>

      <p className="project-links">
        <a href="https://huggingface.co/burhansenh/act_pick_and_place" target="_blank" rel="noopener noreferrer">Model on HuggingFace</a>
        {" · "}
        <a href="https://huggingface.co/datasets/burhansenh/so101_pick_and_place" target="_blank" rel="noopener noreferrer">Dataset on HuggingFace</a>
      </p>

      <h2>Autonomous Evaluation</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>70% Pick and Place Success</h3>
          <p>
            The trained policy runs at 30Hz on a Jetson Orin Nano. Each cycle it
            reads the six joint positions and both camera feeds, runs a forward
            pass through the transformer, and sends the predicted joint targets
            to the arm's servos over a serial bus. No human input during
            execution. The arm selects its own grasp points, plans approach
            trajectories, and places objects autonomously.
          </p>
          <p>
            Across evaluation episodes the policy hit 70% success on pick and
            place. Most failures came from gripper misalignment on the initial
            grasp — the arm approaches correctly but closes slightly off center,
            causing the object to slip. The wrist camera view is where most
            grasp precision comes from, so these failures likely trace back to
            limited data variety in that region of the workspace.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <video controls width="100%" playsInline>
              <source src="/images/so-arm101/IMG_0304.mp4" type="video/mp4" />
            </video>
            <figcaption>Policy executing autonomous pick and place</figcaption>
          </figure>
        </div>
      </div>

      <h2>3D Episode Replay</h2>

      <div className="section-full">
        <p>
          Interactive 3D replay of a successful evaluation episode. The viewer
          renders the robot's URDF model synchronized with the wrist and
          overhead camera feeds and full joint trajectory graphs. Scrub through
          the timeline to see how each joint moves during the pick and place
          sequence.
        </p>
        <div className="embed-container embed-tall">
          <iframe
            src="https://lerobot-visualize-dataset.hf.space/burhansenh/eval_so101_pick_and_place/episode_11"
            title="3D episode replay of evaluation episode 11"
            width="100%"
            height="800"
            frameBorder="0"
            allow="accelerometer; gyroscope"
            loading="lazy"
          />
        </div>
      </div>

      <figure className="project-hero" style={{ marginTop: '1rem' }}>
        <img src="/images/so-arm101/Screenshot from 2026-04-22 17-46-31.png" alt="3D URDF model of the leader and follower SO-ARM101 arms" />
        <figcaption>URDF model of the leader follower arm pair used for trajectory visualization</figcaption>
      </figure>

      <h2>Episode Trajectory Analysis</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Joint Trajectories</h3>
          <p>
            These graphs show the action commands (dashed) versus the actual
            observed joint state (solid) for a single evaluation episode. The
            shoulder, elbow, and wrist joints coordinate through the full pick
            and place sequence over about 48 seconds. You can see the approach
            phase where the shoulder and elbow ramp together, the grasp where
            the gripper closes, the lift and transport, and the place where
            everything reverses.
          </p>
          <p>
            The close tracking between action and observation means the servos
            are keeping up with the policy's commands at 30Hz. Where the dashed
            line leads the solid line, that's the temporal ensembling smoothing
            out the predicted trajectory before the servos execute it.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/so-arm101/Screenshot from 2026-04-22 17-45-34.png" alt="Joint trajectory graph showing shoulder and elbow positions over time" />
            <figcaption>Shoulder pan, shoulder lift, and elbow flex trajectories (action vs observed state)</figcaption>
          </figure>
        </div>
      </div>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Wrist and Gripper Control</h3>
          <p>
            The wrist joints handle the fine orientation adjustments during grasp
            and place. Wrist flex tilts the gripper down toward the object, and
            wrist roll rotates it to align with the object's orientation. These
            joints show more high frequency motion than the shoulder and elbow
            because they're making small corrections throughout the approach.
          </p>
          <p>
            The gripper trace is the clearest indicator of task progress. The
            two peaks correspond to the two grasp attempts in this episode: the
            first opens wide during approach, closes to grab, holds during
            transport, then opens to release. The sharp transitions show the
            policy learned crisp open/close timing rather than gradual squeeze.
          </p>
        </div>
        <div className="section-media">
          <div className="media-stack">
            <figure>
              <img src="/images/so-arm101/Screenshot from 2026-04-22 17-45-42.png" alt="Wrist flex and wrist roll joint trajectories" />
              <figcaption>Wrist flex and wrist roll trajectories</figcaption>
            </figure>
            <figure>
              <img src="/images/so-arm101/Screenshot from 2026-04-22 17-45-56.png" alt="Gripper position showing open and close cycles" />
              <figcaption>Gripper position showing open/close cycles during pick and place</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <h2>Dataset Statistics</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Action Variance and Chunk Length</h3>
          <p>
            The cross-episode action variance heatmap shows how consistent the
            demonstrations are across the 50 episodes. Blue regions mean the
            joint is doing roughly the same thing every episode, while red/orange
            means high variance. The shoulder and elbow joints are most
            consistent during the initial approach (first 25% of the episode)
            and diverge more during transport, which makes sense because
            placement targets varied between episodes.
          </p>
          <p>
            The autocorrelation plot suggests a chunk length of 42 steps (1.4
            seconds). This is the lag at which actions become uncorrelated with
            themselves, meaning the policy needs to plan at least that far
            ahead to capture meaningful motion patterns. This directly informed
            the chunk size hyperparameter for ACT training.
          </p>
        </div>
        <div className="section-media">
          <div className="media-stack">
            <figure>
              <img src="/images/so-arm101/Screenshot from 2026-04-22 17-42-12.png" alt="Cross-episode action variance heatmap across 6 joints" />
              <figcaption>Cross-episode action variance across all 6 joints</figcaption>
            </figure>
            <figure>
              <img src="/images/so-arm101/Screenshot from 2026-04-22 17-43-00.png" alt="Action autocorrelation suggesting 42 step chunk length" />
              <figcaption>Action autocorrelation, suggested chunk length: 42 steps</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Control Delay</h3>
          <p>
            The state-action temporal alignment shows a mean control delay of 3
            steps (100ms). This means the observed joint state lags behind the
            commanded action by about 3 frames on average. This delay comes from
            the servo response time and serial bus latency. The cross-correlation
            peaks at lag 3-5 across different joints, which the temporal
            ensembling in ACT helps compensate for by blending overlapping
            action chunks.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/so-arm101/Screenshot from 2026-04-22 17-42-44.png" alt="State-action temporal alignment showing 3 step control delay" />
            <figcaption>State-action temporal alignment, mean delay: 3 steps (100ms)</figcaption>
          </figure>
        </div>
      </div>

      <h2>ACT Policy</h2>

      <div className="section-row">
        <div className="section-text">
          <h3>Action Chunking with Transformers</h3>
          <p>
            Standard behavioral cloning predicts one action per timestep, so
            small errors compound over a trajectory and the arm drifts off
            course. ACT predicts the next <code>k</code> actions at once (an
            "action chunk"), extending the planning horizon and reducing
            sensitivity to per step noise.
          </p>
          <p>
            The model is a transformer encoder decoder that takes in both camera
            feeds, the current 6-DOF joint state, and a latent style
            variable <code>z</code> from a CVAE. The CVAE captures the
            variability across demonstrations — different episodes approach the
            same task differently, and the latent variable represents that
            distribution instead of averaging into a single trajectory.
            Output is <code>k×6</code> joint targets per forward pass.
          </p>
          <p>
            Temporal ensembling smooths the output further. Overlapping chunks
            produce multiple predictions for the same future timestep, blended
            with exponential weighted averaging for smooth motion instead of
            jerky corrections.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/so-arm101/IMG_0409.jpeg" alt="SO-ARM101 arm next to laptop running control code" />
            <figcaption>Arm with training and inference code</figcaption>
          </figure>
        </div>
      </div>

      <h2>Data Collection</h2>

      <div className="section-row reverse">
        <div className="section-text">
          <h3>Leader Follower Teleoperation</h3>
          <p>
            Two identical SO-ARM101 arms form the teleoperation rig. The leader
            arm is physically moved by hand and its six STS3215 bus servos
            report joint angles at 30Hz. The follower arm mirrors those angles
            in real time. Both arms share the same URDF kinematics so the joint
            mapping is direct, no inverse kinematics needed.
          </p>
          <p>
            I collected 50 episodes totaling 21,623 frames, roughly 12 minutes
            of data. Two cameras record synchronized 480x640 video at 30fps: a
            wrist mount for grasp details and an overhead camera for workspace
            context. Each frame logs the 6-DOF joint state, commanded action
            vector, and both camera feeds.
          </p>
        </div>
        <div className="section-media">
          <figure>
            <img src="/images/so-arm101/IMG_0419.jpeg" alt="Leader and follower arms on desk with laptop" />
            <figcaption>Leader (left) and follower (right) teleoperation setup</figcaption>
          </figure>
        </div>
      </div>

      <h2>Next Steps</h2>

      <div className="section-full">
        <p>
          The 30% failure rate is almost entirely grasp alignment. Collecting
          more demonstrations with varied object positions and orientations
          should push the success rate higher. I also have a digital twin in
          NVIDIA Isaac Sim for validating trajectories before deploying on
          hardware, and plan to use it for domain randomization to augment
          the real training data.
        </p>
        <p>
          Longer term I want to move beyond pick and place to tasks that
          require more dexterity and planning. The two targets are training a
          reinforcement learning agent to play chess (piece manipulation with
          strategic planning) and folding shirts (deformable object
          manipulation with multi step sequencing).
        </p>
      </div>
    </div>
  )
}
