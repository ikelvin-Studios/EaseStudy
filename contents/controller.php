<?php
if ($page == 'Stay Healthy') {
  // code...
  include 'contents/stayHealthy/stayHealthy'.$section.'.php';
} elseif ($page == 'Diabetes') {
  // code...
  include 'contents/diabetis/diabetis'.$section.'.php';
} elseif ($page == 'High Cholestrol') {
  // code...
  include 'contents/cholestrol/cholestrol'.$section.'.php';
} elseif ($page == 'Both Diabetis & High Cholesterol') {
  // code...
  include 'contents/both/both'.$section.'.php';
} else {
  // code...
}
?>
