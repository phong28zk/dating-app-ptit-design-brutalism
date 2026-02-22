"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfileTagGrid } from "@/components/features/profile-tag-grid";
import { CollapsibleSettingsSection } from "@/components/features/collapsible-settings-section";
import { mockProfiles } from "@/data/mock-profiles";

const ME = mockProfiles[0];

export function ProfileSettingsView() {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 max-w-lg mx-auto w-full">
      {/* Profile header */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative">
          <Avatar src={ME.photos[0]} name={ME.name} size="xl" verified />
        </div>
        <div className="text-center">
          <h1 className="text-headline-md">{ME.name}, {ME.age}</h1>
          <p className="text-body-md text-charcoal-500">{ME.school}</p>
        </div>
        <Button variant="secondary">Edit Profile</Button>
      </div>

      {/* Sections */}
      <CollapsibleSettingsSection title="About Me" defaultOpen>
        <p className="text-body-md text-charcoal-700 leading-relaxed">{ME.bio}</p>
      </CollapsibleSettingsSection>

      <CollapsibleSettingsSection title="My Basics">
        <ProfileTagGrid tags={ME.tags} />
      </CollapsibleSettingsSection>

      <CollapsibleSettingsSection title="Work &amp; Education">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-body-md">
            <span className="text-charcoal-500">School</span>
            <span className="font-medium">{ME.school}</span>
          </div>
          <div className="flex justify-between text-body-md">
            <span className="text-charcoal-500">Degree</span>
            <span className="font-medium">Computer Science</span>
          </div>
        </div>
      </CollapsibleSettingsSection>

      <CollapsibleSettingsSection title="Preferences">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-body-sm text-charcoal-500 mb-1">
              <span>Age Range</span>
              <span>20 – 28</span>
            </div>
            <div className="relative h-2 bg-blush-200 rounded-full brutal-border-thin overflow-hidden">
              <div className="absolute left-[10%] right-[20%] h-full bg-rose-500 rounded-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-body-sm text-charcoal-500 mb-1">
              <span>Distance</span>
              <span>15 km</span>
            </div>
            <div className="relative h-2 bg-blush-200 rounded-full brutal-border-thin overflow-hidden">
              <div className="absolute left-0 right-[40%] h-full bg-rose-500 rounded-full" />
            </div>
          </div>
        </div>
      </CollapsibleSettingsSection>

      <CollapsibleSettingsSection title="Account">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-body-md">
            <span className="text-charcoal-500">Email</span>
            <span className="font-medium">minh.tuan@ptit.edu.vn</span>
          </div>
          <div className="flex justify-between text-body-md">
            <span className="text-charcoal-500">Member since</span>
            <span className="font-medium">Jan 2025</span>
          </div>
          <div className="pt-2 border-t border-charcoal-900/10">
            <Button variant="destructive" className="w-full">Log Out</Button>
          </div>
        </div>
      </CollapsibleSettingsSection>
    </div>
  );
}
