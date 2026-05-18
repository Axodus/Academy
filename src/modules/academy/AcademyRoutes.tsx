import { Route, Routes } from "react-router-dom";
import { AcademyShell } from "./components/AcademyShell";
import { AcademyGovernanceReview } from "./pages/AcademyGovernanceReview";
import { AcademyHome } from "./pages/AcademyHome";
import { CertificationViewer } from "./pages/CertificationViewer";
import { CourseDetails } from "./pages/CourseDetails";
import { CourseExplorer } from "./pages/CourseExplorer";
import { LearningDashboard } from "./pages/LearningDashboard";
import { LearningPathViewer } from "./pages/LearningPathViewer";
import { NotFound } from "./pages/NotFound";
import { ProgressEngine } from "./pages/ProgressEngine";
import { RewardsDashboard } from "./pages/RewardsDashboard";
import { TutorProfile } from "./pages/TutorProfile";

export function AcademyRoutes() {
  return (
    <Routes>
      <Route element={<AcademyShell />}>
        <Route index element={<AcademyHome />} />
        <Route path="courses" element={<CourseExplorer />} />
        <Route path="courses/:slug" element={<CourseDetails />} />
        <Route path="dashboard" element={<LearningDashboard />} />
        <Route path="progress" element={<ProgressEngine />} />
        <Route path="tutors/:id" element={<TutorProfile />} />
        <Route path="certifications" element={<CertificationViewer />} />
        <Route path="rewards" element={<RewardsDashboard />} />
        <Route path="academy-governance-review" element={<AcademyGovernanceReview />} />
        <Route path="paths/:id" element={<LearningPathViewer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
