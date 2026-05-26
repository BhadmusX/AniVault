export function savetoLocalstorage(favorites) {
  const existing = loadfromlocalstorage() || [];
  const index = existing.findIndex(
    (item) => String(item.id) === String(favorites.id),
  );

  if (index !== -1) {
    existing[index].status = favorites.status;
  } else {
    existing.push(favorites);
  }
  localStorage.setItem("favorites", JSON.stringify(existing));
}

export function loadfromlocalstorage() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function removefromlocal(id) {
  const existing = loadfromlocalstorage();
  const normalizedId = String(id);
  const index = existing.findIndex((item) => String(item.id) === normalizedId);

  if (index !== -1) {
    existing.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(existing));
  }
}
