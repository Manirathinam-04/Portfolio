"""
Blender 4.x Python Automation Script
Spiderman Hand & Mechanical Web-Shooter Model Generator
To run in Blender:
blender --background --python scripts/blender_spiderman_hand.py -- public/models/spiderman-hand.glb
"""
import bpy
import math

def build_scene():
    # Clear existing objects
    bpy.ops.wm.read_factory_settings(use_empty=True)

    # 1. Arm & Glove Hierarchy
    bpy.ops.mesh.primitive_cylinder_add(radius=0.75, depth=3.8, location=(-2.0, 0, 0))
    forearm = bpy.context.active_object
    forearm.name = "spiderman_arm"
    forearm.rotation_euler = (0, math.radians(90), 0)

    # 2. Wrist Web-Shooter Housing
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.15, 0.58, 0))
    housing = bpy.context.active_object
    housing.name = "web_shooter_housing"
    housing.scale = (0.95, 0.35, 0.75)

    # 3. Firing Nozzle
    bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=0.35, location=(0.70, 0.63, 0))
    nozzle = bpy.context.active_object
    nozzle.name = "web_nozzle"
    nozzle.rotation_euler = (0, math.radians(90), 0)

    # 4. Hand Palm
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.6, -0.05, 0))
    palm = bpy.context.active_object
    palm.name = "spiderman_glove"
    palm.scale = (1.2, 0.55, 1.1)

    print("Blender scene construction completed.")

if __name__ == "__main__":
    build_scene()
