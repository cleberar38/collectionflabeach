<?php
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','postgres','123456','common');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM item;  WHERE id = '".$q."'";
$result = mysqli_query($con,$sql);

echo "<table>
<tr>
<th>Item Name</th>
<th>Tags</th>
<th>Weight</th>
<th>Hometown</th>
<th>Job</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['itemname'] . "</td>";
    echo "<td>" . $row['tags'] . "</td>";
    echo "<td>" . $row['weight'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>