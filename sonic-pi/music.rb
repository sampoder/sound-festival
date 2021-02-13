

=begin

Reference Doc:

Moods:

0: Spooky
1: Electric
2: Undefined

SFX:

0:

=end

x = 20

require 'pusher-client'
cluster = 'us2'  
channels_client = PusherClient::Socket.new('b0fffd0f6692eadd6d60', {
  secure: true,
  ws_host: "ws-#{cluster}.pusher.com"
})

# Spooky Background Mood

live_loop :haunted do
  if(x==0)
    sample :perc_bell, rate: rrand(-1.5, 1.5)
  end
  sleep rrand(0.1, 2)
end
live_loop :guit do
  if(x==0)
    with_fx :echo, mix: 0.3, phase: 0.25 do
      sample :guit_em9, rate: 0.5
    end
    sample :guit_em9, rate: 1.5
  end
  sleep 8
end
live_loop :boom do
  if(x==0)
    with_fx :reverb, room: 1 do
      sample :bd_boom, amp: 10, rate: 1
    end
  end
  sleep 8
end

# Electric Mood

load_samples :guit_em9, :bd_haus
live_loop :low do
  if(x==1)
    tick
    synth :zawa, wave: 1, phase: 0.25, release: 5, note: (knit :e1, 12, :c1, 4).look, cutoff: (line 60, 120, steps: 6).look
  end
  sleep 4
end
with_fx :reverb, room: 1 do
  live_loop :lands, auto_cue: false do
    if(x==1)
      use_synth :dsaw
      use_random_seed 310003
      ns = (scale :e2, :minor_pentatonic, num_octaves: 4).take(8)
      16.times do
        play ns.choose, detune: 12, release: 0.1, amp: 2, amp: rand + 0.5, cutoff: rrand(70, 120), amp: 2
        sleep 0.125
      end
    end
    sleep 0.125
  end
end
live_loop :fietsen do
  sleep 0.25
  if(x==1)
    sample :guit_em9, rate: 1
  end
  sleep 7.75
end
live_loop :tijd do
  if(x==1)
    sample :bd_haus, amp: 2.5, cutoff: 100
  end
  sleep 1
end
live_loop :ind do
  if(x==1)
    sample :loop_industrial, beat_stretch: 1
  end
  sleep 1
end

# Undefined

live_loop :synths do
  use_synth :mod_saw
  use_synth_defaults amp: 0.5, attack: 0, sustain: 1, release: 0.25, mod_range: 12, mod_phase: 0.5, mod_invert_wave: 1
  notes = (ring :F, :E, :D, :D, :G, :E, :D, :D)
  notes.each do |n|
    if(x==2)
      tick
      play note(n, octave: 1), cutoff: (line 90, 130, steps: 8).look
      play note(n, octave: 2), cutoff: (line 90, 130, steps: 16).look
      
    end
    sleep 1
  end
end
live_loop :snare, delay: 12.5 do
  if(x==2)
    sample :drum_snare_soft
  end
  sleep 1
end

# SFX Zone

b=10

live_loop :effects do
  if(b == 0)
    sample :vinyl_rewind
  end
  if(b == 1)
    sample :drum_tom_hi_hard
    sleep 0.4
    sample :drum_tom_lo_hard, rate: 0.3
    sleep 0.4
    sample :drum_cymbal_open
  end
  if(b == 2)
    sample :elec_beep
    sleep 0.3
    sample :elec_beep
    sleep 0.3
    sample :elec_blip, rate: 0.3
  end
  if(b == 3)
    sample :misc_cineboom
  end
  if(b == 4)
    sample :perc_snap2
    sleep 0.3
    sample :perc_snap
  end
  if(b == 5)
    sample :perc_bell
  end
  if(b == 6)
    sample :misc_crow
    sleep 0.4
    sample :misc_crow, rate: 0.9
  end
  if(b == 7)
    sample :perc_till
  end
  if(b == 8)
    sample :ambi_choir
  end
  if(b == 9)
    sample "/Users/sam/Downloads/kahootsfx.flac"
  end
  if(b == 10)
    sample :guit_e_fifths
    sleep 3
    sample :guit_e_slide
  end
  if(b == 11)
    sample :perc_swash
  end
  b = 100
  sleep 1
end


