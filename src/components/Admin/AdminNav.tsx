import { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, File, Mail, Settings } from 'react-feather';
import { NavLink, useLocation } from 'react-router-dom';
import AdminNavEvents from './AdminNavEvents';
import AdminNavPhotos from './AdminNavPhotos';
import AdminNavRevenu from './AdminNavRevenu';

type AccordionState = {
  section1: boolean;
  section2: boolean;
  section3: boolean;
  section4: boolean;
};

const AdminNav = () => {
  const path = useLocation().pathname;
  // Définir l'état d'ouverture des sections (accordion)
  const [openSections, setOpenSections] = useState<AccordionState>({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
  });

  // Fonction pour alterner l'état d'une section spécifique
  const toggleAccordion = (section: keyof AccordionState) => {
    setOpenSections((prevState) => {
      // On ferme toutes les sections et on ouvre seulement celle qui est cliquée
      const newState = {
        section1: false,
        section2: false,
        section3: false,
        section4: false,
      };

      // On ouvre la section ciblée
      newState[section] = !prevState[section];

      return newState;
    });
  };

  return (
    <nav className="w-[373px] border-r-[1px] border-black/80 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-lg mx-auto">
        {/* Section 1 */}
        <div>
          <div
            className="cursor-pointer flex items-center gap-4 h-full"
            onClick={() => toggleAccordion('section1')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleAccordion('section3');
              }
            }}
          >
            <div className="flex justify-between w-full h-full">
              <div className="flex items-center h-16 gap-2 p-4">
                {openSections.section1 ? <ChevronDown /> : <ChevronRight />}
                <h3 className={openSections.section1 ? 'text-base font-semibold' : 'text-base font-normal'}>Paramètres agenda</h3>
              </div>
              <div className="bg-[#191919] w-16 h-16 p-4 flex justify-center items-center">
                <Calendar className={openSections.section1 ? 'text-brown' : 'text-white'} />
              </div>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-linear ${openSections.section1 ? 'h-24' : 'h-0'}`}>
            <ul>
              <NavLink
                to="prestations"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Gérer les prestations
              </NavLink>
              <NavLink
                to="evenements"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Gérer les évènements
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <div
            className="cursor-pointer flex items-center gap-4 border-t-[1px] border-black"
            onClick={() => toggleAccordion('section2')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleAccordion('section3');
              }
            }}
          >
            <div className="flex justify-between w-full h-full">
              <div className="flex items-center h-16 gap-2 p-4">
                {openSections.section2 ? <ChevronDown /> : <ChevronRight />}
                <h3 className={openSections.section2 ? 'text-base font-semibold' : 'text-base font-normal'}>Paramètres société</h3>
              </div>
              <div className="bg-[#191919] w-16 h-16 p-4 flex justify-center items-center">
                <Settings className={openSections.section2 ? 'text-brown' : 'text-white'} />
              </div>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-linear ${openSections.section2 ? 'h-[15rem]' : 'h-0'}`}>
            <ul>
              <NavLink
                to="photos"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Gérer les photos
              </NavLink>
              <NavLink
                to="description"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Descriptif de la société
              </NavLink>
              <NavLink
                to="notification"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Notification des RDV
              </NavLink>
              <NavLink
                to="horaires-délais"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Gérer les horaires et délais
              </NavLink>
              <NavLink
                to="consigne"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Gestion des consignes
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b-[1px] border-black">
          <div
            className="cursor-pointer flex items-center gap-4 border-t-[1px] border-black"
            onClick={() => toggleAccordion('section3')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleAccordion('section3');
              }
            }}
          >
            <div className="flex justify-between w-full h-full">
              <div className="flex items-center h-16 gap-2 p-4">
                {openSections.section3 ? <ChevronDown /> : <ChevronRight />}
                <h3 className={openSections.section3 ? 'text-base font-semibold' : 'text-base font-normal'}>Statistiques et messagerie</h3>
              </div>
              <div className="bg-[#191919] w-16 h-16 p-4 flex justify-center items-center">
                <Mail className={openSections.section3 ? 'text-brown' : 'text-white'} />
              </div>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-linear ${openSections.section3 ? 'h-24' : 'h-0'}`}>
            <ul>
              <NavLink
                to="chiffre-affaire"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Chiffre d&apos;affaires
              </NavLink>
              <NavLink
                to="email"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Notification par Email
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="border-b-[1px] border-black">
          <div
            className="cursor-pointer flex items-center gap-4"
            onClick={() => toggleAccordion('section4')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleAccordion('section3');
              }
            }}
          >
            <div className="flex justify-between w-full h-full">
              <div className="flex items-center h-16 gap-2 p-4 w-4/5">
                {openSections.section4 ? <ChevronDown /> : <ChevronRight />}
                <h3 className={openSections.section4 ? 'text-base font-semibold' : 'text-base font-normal'}>Cartes de chasse et document(s)</h3>
              </div>
              <div className="bg-[#191919] w-16 h-16 p-4 flex justify-center items-center">
                <File className={openSections.section4 ? 'text-brown' : 'text-white'} />
              </div>
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-linear ${openSections.section4 ? 'h-24' : 'h-0'}`}>
            <ul>
              <NavLink
                to="cartes"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Cartes de chasse
              </NavLink>
              <NavLink
                to="documents"
                className={({ isActive }) =>
                  isActive
                    ? 'h-12 pl-16 text-brown font-semibold flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                    : 'h-12 pl-16 flex items-center justify-between after:w-16 after:h-full after:bg-[#191919]'
                }
              >
                - Autres documents
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      {path === '/administration/evenements' && <AdminNavEvents />}
      {path === '/administration/photos' && <AdminNavPhotos />}
      {path === '/administration/chiffre-affaire' && <AdminNavRevenu />}
    </nav>
  );
};

export default AdminNav;
