#!/bin/bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# ─────────────────────────────────────────
# Colors
# ─────────────────────────────────────────
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ─────────────────────────────────────────
# Package manager selection
# ─────────────────────────────────────────
echo -e "${CYAN}"
echo "╔══════════════════════════════════════╗"
echo "║       📦 Install Packages            ║"
echo "╚══════════════════════════════════════╝"
echo -e "${NC}"
echo -e "Choose a package manager:"
echo -e "  ${GREEN}1)${NC} npm"
echo -e "  ${YELLOW}2)${NC} yarn"
echo ""
read -p "Enter choice [1 or 2]: " choice

case $choice in
  1) PKG="npm install" ;;
  2) PKG="yarn install" ;;
  *)
    echo -e "${RED}❌ Invalid choice. Please enter 1 or 2.${NC}"
    exit 1
    ;;
esac

# ─────────────────────────────────────────
# Install function
# ─────────────────────────────────────────
install_packages() {
  local FOLDER=$1

  echo -e "\n${CYAN}📂 Installing in ${FOLDER}...${NC}"
  cd "$ROOT_DIR/$FOLDER" || { echo -e "${RED}❌ Folder '$FOLDER' not found!${NC}"; exit 1; }

  $PKG

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ $FOLDER — done!${NC}"
  else
    echo -e "${RED}❌ $FOLDER — install failed!${NC}"
    exit 1
  fi
}

# ─────────────────────────────────────────
# Run installs
# ─────────────────────────────────────────
install_packages "frontend"
install_packages "server"

echo -e "\n${GREEN}🎉 All packages installed successfully!${NC}\n"