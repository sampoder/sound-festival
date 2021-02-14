

=begin

Reference Doc:

Moods:

0: Spooky
1: Electric
2: Undefined

SFX:

0:

=end

x = 100
b =100

live_loop :midi_sync do
  q, a = sync "/midi:my_virtual_output:1/note_on"
  if(a == 1)
    b = q
  else
    x = q
  end
end

# Spooky Background Mood
with_fx :band_eq, amp:0.1 do
  live_loop :haunted do
    if(x==0)
      sample :perc_bell, rate: rrand(1, 1.5)
    end
    sleep rrand(5, 7)
  end
  live_loop :guit do
    if(x==0)
      with_fx :echo, mix: 0.3, phase: 0.25 do
        sample :guit_em9, rate: 0.5
      end
      sample :guit_em9, rate: 1.5
      sleep 4
    end
    sleep 0.1
  end
  live_loop :boom do
    if(x==0)
      with_fx :reverb, room: 1 do
        sample :bd_boom, amp: 10, rate: 1
      end
      sleep 4
    end
    sleep 0.1
  end
end

# Electric Mood

load_samples :guit_em9, :bd_haus
with_fx :band_eq, amp:0.02 do
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
end


# Undefined
with_fx :band_eq, amp:0.05 do
  use_random_seed 667
  load_sample :ambi_lunar_land
  sleep 1
  live_loop :foo do
    with_fx :reverb, kill_delay: 0.2, room: 0.3 do
      if(x==2)
        4.times do
          use_random_seed 4000
          8.times do
            sleep 0.25
            play chord(:e3, :m7).choose, release: 0.1, pan: rrand(-1, 1, res: 0.9), amp: 1
          end
        end
      end
    end
    sleep 0.25
  end
  live_loop :bar, auto_cue: false do
    if(x==2)
      if rand < 0.5
        sample :ambi_lunar_land
        puts :comet_landing
      end
      sleep 8
    end
    
    sleep 0.1
  end
end

# SFX Zone

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
    with_fx :echo do
      sample :ambi_choir
    end
    
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


